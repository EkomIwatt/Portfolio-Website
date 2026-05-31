---
title: "Pit Wall — Surviving the IES Buildathon"
description: "24 hours, one ESP32, two teammates, and a phone-controlled dragster. Pit Wall's pivots, failures, and what I learned leading my first hackathon team."
pubDate: 2026-04-17
series: "Solder, Sparks, and Sockets"
readingTime: "15 min read"
---

24 hours. One ESP32. Two teammates. A motor driver that betrayed us halfway through. 🏎️💨

From the 13th to the 14th of April, I participated in the IEEE IES (Industrial Electronics Society) Buildathon at Unilag with my team — **Jubril Dokun**, **Abdullah**, and myself — competing as **Team Rodney**. 10am to 10am. No theme, no prompt, just *build something*.

What we ended up shipping was **Pit Wall**: a phone-controlled dragster where players connect their smartphones to an ESP32's Wi-Fi network, compete in browser-based minigames (Simon, Reaction Tug-of-War, and Wordle), and their digital victories translate directly into the physical movement of a 2-wheel-drive robotic car. The finish line is detected autonomously by an IR sensor, and the whole thing runs on a single microcontroller with no internet required.

> What started as two cars and two dedicated controllers became one car and two phones — and honestly, the constraint made it better.

Here's the story of how it came together, everything we broke along the way, and what I learned leading my first hackathon team.

## 1. The Original Plan (That Didn't Survive Contact With Reality)

Our initial vision was ambitious: **two 3D-printed dragsters**, each with its own dedicated ESP32 microcontroller, racing head-to-head on a straight track. Two more ESP32s would act as dedicated physical controllers — think tiny handheld game pads with buttons. It would feel like a proper arcade drag race.

That vision died quickly.

Hardware availability at a student hackathon is a brutal constraint. We could only get our hands on **two ESP32 dev boards** total, not the four our original architecture demanded. And then, after some initial testing, I discovered that one of those two boards wasn't working properly — I suspect the USB input port was bad, because it refused to stay in a stable flash state no matter what I tried. That left us with exactly **one functional ESP32**.

One microcontroller. One car. So what do we do about the controllers?

## 2. The Pivot: Phones as Controllers

Instead of burning more time hunting for hardware, we flipped the architecture. What if the ESP32 itself became the server, and everyone's **smartphone** became the controller?

It sounded almost too convenient, but the ESP32 is genuinely capable of this. In **SoftAP mode**, it hosts its own Wi-Fi access point. With the **ESPAsyncWebServer** library, it can serve a full HTML/CSS/JS web app from its flash memory. And with WebSockets, multiple phones can maintain persistent, real-time connections to it simultaneously — no internet, no router, no cloud anything.

The moment we committed to this, the whole project got better:

- **No hardware limit on players.** Any phone with a browser can join.
- **Infinite UI flexibility.** We could design game interfaces in HTML/CSS rather than wire up LED matrices or tiny OLEDs.
- **Easier demos.** Judges could just pull out their own phones, scan the network, and play.
- **Scalable game modes.** Adding a new minigame became a matter of writing HTML and a WebSocket handler, not soldering new components.

Constraints forcing better design is a recurring theme in engineering, and this was my clearest taste of it yet.

## 3. The Stack

Since we were leaning hard into the "embedded system as a web server" pattern, the stack had to support real-time, non-blocking, multi-client behavior on a $5 chip.

- **ESP32 Dev Module** running the Arduino framework via **PlatformIO** in VS Code.
- **SoftAP mode** broadcasting the `DRAGSTERS` SSID.
- **ESPAsyncWebServer + AsyncTCP** for the HTTP + WebSocket layer.
- **SPIFFS** to store the HTML/CSS/JS frontend on the ESP32's flash, served directly to connected phones.
- **L298N dual H-bridge motor driver** controlling two yellow DC gear motors.
- **TCRT5000 IR obstacle sensor** mounted under the chassis for finish line detection.
- **7.4V LiPo battery** powering everything through the L298N's onboard 5V regulator.

One decision I'm particularly proud of was choosing **WebSockets over HTTP polling**. For a game where one player's mistake needs to instantly lock the other player's screen and fire the motors, polling would have added 100–500ms of latency depending on the interval. WebSockets keep a persistent TCP connection open, so the server can push state changes to every connected client the millisecond they happen. In a reaction-based game, that difference isn't cosmetic — it's the game.

## 4. The Game Modes

We ended up building three distinct game modes, all served from the same lobby screen.

### Simon Says

The classic. The ESP32 generates a random color sequence, both phones play it back, and whoever successfully repeats it gets a motor burst pushing the car toward their side. Round length scales up as the game progresses. Satisfying, visual, and the failure condition is binary — you either got it or you didn't.

### Reaction Tug-of-War

A random color lights up after a random delay, and the first phone to tap it wins that round. Because the ESP32 is the single source of truth for who tapped first, network jitter between the two phones gets equalized — both messages travel the same short Wi-Fi hop. First to 5 wins.

### Wordle (The Pivot-Within-The-Pivot)

This one took a redesign. Our first implementation inched the car forward for every correct letter, thinking more feedback would feel better. In practice it felt like **parallel parking, not a drag race** — the car crept along in tiny twitches and the tension was completely gone. We rewrote the logic so the car stays perfectly still while the player guesses, and the moment the full 5-letter word is cracked, it unleashes a single dramatic motor burst. Completely different energy.

We also moved the target word **server-side**. Originally it was hardcoded in the HTML, which meant anyone with DevTools could peek. The ESP32 now picks from a list and only ever sends the result of each guess back to the phone, not the answer itself.

## 5. The Downs (Where Things Got Painful)

No hardware hackathon is ever smooth. Here are the gremlins that tried to eat us alive.

### The L298N Meltdown

Mid-build, after the wiring was done and the code was compiling cleanly, I hit the test button and... nothing. The car just sat there. Both motors locked. No movement, no sound, no smoke — just silent refusal.

I broke out the multimeter. The readings were strange: the voltage between **OUT1 and OUT2 was 0V**, but between **OUT1 and Ground, it was 7.8V**. Normally, an H-bridge applies differential voltage across the motor — one output high, the other low, the difference drives the motor. A 0V differential with 7.8V on both outputs meant the internal H-bridge had **failed closed**, dumping raw battery voltage to both terminals simultaneously. The chip was dead.

Swapping in a replacement L298N got us moving again, but it cost us real debugging time we hadn't budgeted for.

### The "Identical" Motor Lie

Once the car was moving, it refused to drive straight. It veered hard to one side, no matter what I did. I knew this was coming in theory — cheap yellow gear motors *never* spin at identical RPMs because of manufacturing tolerances and internal friction — but seeing it in practice was still jarring.

I tried fixing it in software with differential **PWM**, reducing the duty cycle on the faster motor to balance the speeds. It didn't work. The car kept veering.

### The Stall Torque Trap

I nearly went down a rabbit hole rewriting the PWM logic before I realized the real culprit: the LiPo battery was running low. The L298N has a notorious **~1.5V voltage drop** across its older BJT output transistors. On a low battery (already down to ~6V), the motors were getting barely 4.4V — right at the edge of the **stall torque threshold**, where internal friction nearly equals the motor's output force.

At that voltage, the weaker motor physically *couldn't* overcome its own friction, and no amount of software trim would fix that. I was trying to tune a knob that wasn't connected to anything. Once we swapped in a fully charged pack, the PWM trim worked beautifully on the first try.

Lesson: **check your power before you debug your code.**

### The PlatformIO Library Maze

PlatformIO's dependency resolver is powerful but occasionally malicious. When I first tried to build the firmware, the compiler threw pages of errors — references to `CYW43439` Wi-Fi chips, `RASPBERRY_PI_PICO_W` board requirements, missing headers. None of which should have been anywhere near an ESP32 project.

The issue was that I'd listed my dependencies with generic names — `"ESP Async WebServer"` and `"AsyncTCP"` — and PlatformIO had obligingly pulled in a library called `AsyncTCP_RP2040W`, which is designed for the Raspberry Pi Pico W, a completely different microcontroller. It matched the name well enough that the resolver grabbed it.

The first fix attempt was to pin the libraries to author-prefixed names. That failed too — the registry naming had changed and the new names wouldn't resolve. The **nuclear option** that finally worked was pointing `platformio.ini` directly at GitHub:

```ini
lib_deps =
    https://github.com/me-no-dev/AsyncTCP.git
    https://github.com/me-no-dev/ESPAsyncWebServer.git
```

No registry lookup, no name ambiguity, just raw source. Worked on the first build.

### The SPIFFS Silent Trap

During the frantic final hours, I updated the HTML to include the new Wordle UI, hit "Upload," waited for the success message... and nothing changed on the phone. The same old interface loaded.

It took a minute of genuine head-scratching to remember: flashing `main.cpp` only updates the firmware. The HTML/CSS/JS files live in **SPIFFS** (the ESP32's separate filesystem partition), and SPIFFS has to be built and uploaded **as a completely separate step**:

```bash
pio run -t buildfs
pio run -t uploadfs
```

In a calm environment this is obvious. At 4am with judges circling, it's the kind of thing that can cost you 20 minutes of "why isn't my code working" before the lightbulb goes off.

### The Disappearing COM Port

At one point the ESP32 just... vanished from my machine. COM port gone, device manager showing nothing. I was pretty sure the board was dead. Turned out a background serial monitor process was hogging the port, and the USB connection needed a hard reset — unplug, kill the stuck processes, hold the BOOT button, re-plug. Back to life.

Related tip I learned the hard way: always **disconnect the LiPo while flashing over USB**. Two simultaneous power sources feeding the same ESP32 is a great way to fry either the board, the regulator, or your laptop's USB port.

## 6. The Ups (Where the Architecture Paid Off)

Every hardware down had a corresponding software up, and they all traced back to decisions we made early.

### Non-Blocking Everything

From the first line of firmware, I refused to use `delay()`. Every timing-dependent operation — motor bursts, countdowns, game timers, sensor polling — ran off `millis()` heartbeats in an asynchronous state machine.

This mattered enormously. With `delay()`, the WebSocket server would stall for the duration of any delay call. Connected phones would experience dropped frames, missed inputs, or full disconnection. With `millis()`, the main loop runs thousands of times per second, and the ESP32 cheerfully services WebSocket traffic, reads the IR sensor, updates motor PWM, and runs game logic all in parallel.

### Adding Wordle in 20 Minutes

Because the WebSocket message handler was already cleanly scoped — every message got parsed as JSON, routed by a `type` field, and dispatched to the right game mode — adding Wordle as a third game mode took **under 20 minutes** of backend work. The ESP32 didn't need any architectural change; it just needed to listen for `wordleGuess` messages and emit `wordleResult` messages back. Motor bursts were triggered by the same `pulseMotor()` function the other modes used.

This is the part of embedded engineering I find deeply satisfying — when the abstractions hold up under pressure and you can extend the system without rewriting it.

### The Autonomous Finish Line

Our "wow" feature, and the one I'm proudest of: a **TCRT5000 IR obstacle sensor** mounted under the chassis, constantly polling for a strip of black electrical tape across the track.

Originally we were going to use a software timer — assume the race ends after N seconds. But in a competitive setup, network jitter and battery drift would make that hopelessly inaccurate. The IR sensor was our **ground truth**. The moment it detected the black line, it fired a hardware interrupt that immediately killed the motors, set a `raceFinished` flag, and broadcast a `FINISH LINE CROSSED` WebSocket message to both phones with the winner's identity.

It transformed the project from a "remote-controlled toy" into something that felt like a proper **edge-computing system** — one that makes autonomous decisions in real time, without round-tripping through a server.

## 7. Leading a Team for the First Time

This was my first time actually leading a hackathon team, and it's a different skill from just coding.

A lot of it was context management — making sure Jubril and Abdullah always knew what the current state of the system was, what was blocking progress, and what the next concrete task was. When the L298N blew, the instinct was for all three of us to crowd around the multimeter. I had to make sure we stayed parallelized: one person on hardware replacement, one on the web UI, one on firmware. Divide and conquer is easy to say and weirdly hard to actually do.

I also learned to be louder about uncertainty. When I wasn't sure whether a problem was software or hardware (the stall torque fiasco being the prime example), saying *"I don't know yet, let me isolate it"* out loud turned out to be way more useful than pretending to have a plan. My team could help me isolate it faster than I could alone.

## 8. Takeaways

A few things I'll carry forward from this build:

- **Hardware constraints force better architecture.** The forced pivot from two-cars-two-controllers to one-car-two-phones produced a system that was more versatile, more scalable, and easier to demo than our original plan. I keep learning this lesson and I suspect I'll keep needing to.
- **Check power before you check code.** Half the "software bugs" I chased were battery voltage issues. A multimeter is the single most useful debugging tool in embedded work, and I didn't reach for it fast enough.
- **Non-blocking architecture isn't optional.** The moment you're doing real-time networking *and* physical actuation on the same chip, `delay()` becomes your enemy. `millis()` state machines scale. `delay()` doesn't.
- **The ESP32 is absurdly capable.** A single $5 chip running a Wi-Fi AP, an async web server, a WebSocket broker for multiple clients, three game modes, PWM motor control, and interrupt-driven sensor polling — all at once, without breaking a sweat.
- **Lead by isolating bottlenecks, not by doing everything yourself.** When I hoarded tasks, the team slowed down. When I parallelized clearly, we moved fast.

## 9. What's Next?

Winners haven't been announced yet — that'll happen at the upcoming **IES Conference**. Regardless of the outcome, Pit Wall is the project I'm proudest of so far in my degree, and I want to keep pushing it:

- **More game modes.** A typing-speed race and a math-reflex game are both trivial to add given the current architecture.
- **Dual-car rematch.** Now that I understand the ESP-NOW protocol, a two-car synchronized launch (with one car as the master broadcasting start signals to the other) is the obvious next evolution. I have the theory; I just need the second working board.
- **A real PCB.** The breadboard-and-jumper-wire version works, but a custom PCB would make the whole thing demo-ready in any environment.

Shipping a working hardware prototype in 24 hours — across smoke, stall torque, and stubborn library resolvers — was genuinely one of the most satisfying things I've done as an engineer. And it was a reminder that the gap between *code that compiles* and *hardware that works* is where the real learning happens.

Thanks to **Jubril** and **Abdullah** for being incredible teammates, to IEEE IES Unilag for organizing the Buildathon, and to the L298N that gave its life for our education.

On to the next one.

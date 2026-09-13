# Canvas → Google Tasks

**Live prototype:** https://dan-wright-1.github.io/canvas-to-tasks/
**Repository:** https://github.com/dan-wright-1/canvas-to-tasks
**Initial AI commit:** [`8d56d98`](https://github.com/dan-wright-1/canvas-to-tasks/commit/8d56d98) · **Revision PR:** [#1](https://github.com/dan-wright-1/canvas-to-tasks/pull/1)

A three-screen mock-up for a tool that pulls a student's Canvas assignments into Google Tasks in one sync action, instead of leaving them to retype deadlines by hand.

## 1. Need, persona, capability, value

| | |
|---|---|
| **Need** | Real deadlines live in Canvas, but the place students actually plan their day is Google Tasks — so every week they manually re-copy assignments across, and inevitably miss or mistype a few. |
| **Persona** | Manages 4–5 Canvas courses a semester, already lives in Google Tasks/Calendar for daily planning, and checks Canvas in a weekly sweep rather than constantly. |
| **Capability** | Pull upcoming Canvas assignments into Google Tasks in one sync action, with control over which ones get added. |
| **Value** | **Certainty** — the payoff is trusting that one task list is complete, instead of holding two systems in your head and hoping nothing slipped. |

The need never names the product. The capability is an observable action ("pull assignments in, choose which"), not a feeling. The value is the payoff word (certainty) plus why it matters, kept separate from the capability that produces it.

## 2. The three screens

| Screen | Job | Why it earned a slot | Design question it answers |
|---|---|---|---|
| **1. Landing** | Signal the capability ("sync Canvas → Google Tasks") and the value (certainty) before anything else | It's the only screen a first-time visitor judges the whole idea by — everything else is contingent on this one landing | Does the first thing a visitor sees name the capability and value, or does it get diluted by competing asks? |
| **2. Review & Select** | Show the capability actually working: pull real-looking Canvas assignments and let the student control which sync | This is the moment the product *does the thing* — a settings or login screen would show nothing about the value | Does grouping assignments the way Canvas already groups them (by course) make the list feel trustworthy and scannable, or like a raw data dump? |
| **3. Synced Confirmation** | Show the payoff: assignments now sitting inside Google Tasks, complete | This is where "certainty" becomes visible rather than asserted — the student sees the finished list, not just a success toast | Does seeing the completed list build the feeling that nothing was missed, rather than just confirming an action happened? |

## 3. Feedback question plan

Predictions are written before ever asking the persona, and tied to a specific part of the prototype.

| Group | Question (as I'd say it to the persona) | Predicted answer | What the prediction rests on |
|---|---|---|---|
| Need | "Tell me about the last time a Canvas deadline snuck up on you — what did you end up doing?" | "I found out in class and scrambled that night" — most describe finding out *late*, not never finding out | The need statement assumes discovery, not awareness, is the failure point |
| Need | "What do you use to keep track of assignments now, and what's annoying about it?" | "Google Tasks or my planner, but I have to go back into Canvas to double check I got everything" | Matches the "re-copy by hand" workaround the need is built on |
| Value | "If this were solved for you, what's one word for what you'd get?" | "Peace of mind" or "one less thing to think about" — close to certainty, but said more casually | The landing screen's subhead ("trust that your list is complete") is written toward this word, so a close match validates it landed |
| Persona | "How often does this come up, and what are you usually doing when it does?" | "Every Sunday when I plan my week" or "randomly, whenever a professor mentions something in class" — a mix, since the persona's weekly-sweep habit is assumed, not confirmed | The persona guess (weekly sweep) is the least tested of the four answers, so I expect some split here |
| Capability | "I'll show you this for five seconds — what does this product do?" (Screen 1) | Most say "it moves my Canvas assignments to Google Tasks" or "it syncs my classes to my to-do list" | Tests whether the single-CTA, single-sentence landing screen actually communicates the mechanism that fast |
| Capability | "Click around on this and tell me what you think it's for." (Screen 2) | Most describe it as "picking which assignments to add" rather than just "a list of my homework" | Tests whether the per-course grouping and checkboxes read as *controllable selection*, not just a passive list |

## 4. Design justification and first read

Opening the live URL cold, as a first-time visitor:

- **Does the landing screen signal the capability and value before reading closely?** Yes — the headline states the mechanism ("Turn your Canvas assignments into Google Tasks — synced in one click") and the subhead carries the value word (trust/certainty), with one button as the only next action.
- **Does every element earn its place, or does anything compete?** Yes, after the revision. The original AI draft had a marketing navbar (Features / Pricing / Login / Sign Up) and two equal-weight buttons (Sign Up Free / See Features) sitting on top of the hero — classic **competing signaling**, where a visitor can't tell which action is the point. Both were removed; the only interactive element left is "Connect Canvas."
- **What belongs together on each screen, and which Gestalt principle shows it?** On Screen 2, assignments from the same course are grouped using **proximity** (spacing between cards), **common region** (the card boundary itself), and **similarity** (a repeated color accent per course) — so a student recognizes "these four are my courses" without reading a label on every row. On Screen 3, the synced items share one visual treatment (a green checkmark, one list) so the whole set reads as **uniformly complete**.
- **Do Screens 2 and 3 stay on mission, and is home always reachable?** Yes — neither is a settings or login screen; both directly demonstrate pulling assignments in and seeing them land in Google Tasks. The logo in the header links back to the landing screen on all three pages, and Screen 3 adds an explicit "Back to home" button since it's the end of the flow.
- **What did the AI's first pass get wrong, and what changed?** Three things, all fixed in [PR #1](https://github.com/dan-wright-1/canvas-to-tasks/pull/1): a generic SaaS navbar and two competing CTAs on the landing screen; a flat, ungrouped assignment list on the review screen; and no working navigation back to the landing screen from Screens 2 or 3 — the header logo was plain text, not a link.
- **Which design question motivated each change?** The landing-screen fix answers Screen 1's design question directly — nothing can compete with the affordance sentence. The grouping fix answers Screen 2's design question — grouping by course is what makes the list read as trustworthy rather than a dump of rows. The navigation fix wasn't tied to a single screen's design question but to the shared requirement that all three screens work as one product a visitor can move through freely.

### Before / after: the landing screen

**Before** ([initial commit](https://github.com/dan-wright-1/canvas-to-tasks/blob/8d56d98/index.html)): A navbar with Features / Pricing / Login / Sign Up sat above a vague headline ("The smarter way to manage your student life"), followed by two equal-weight buttons (Sign Up Free / See Features) and a three-icon feature row (Sync / Organize / Never Miss). Nothing told a first-time visitor what the product actually does in the first five seconds — the hero gave equal visual weight to four nav items and two CTAs, so no single element was signaling the primary capability.

**After** ([current `index.html`](index.html)): The navbar is gone. The headline states the capability and mechanism directly ("Turn your Canvas assignments into Google Tasks — synced in one click"), the subhead carries the value (certainty), and there is exactly one button ("Connect Canvas"). A small "Canvas → Google Tasks" chip row below reinforces the same message instead of adding a new one.

## Design brief (handed to the agent)

- **Product:** A mock-up that syncs a student's Canvas assignments into Google Tasks in one action.
- **Need → Persona → Capability → Value:** as in section 1 above, value-first.
- **Screens:** Landing (signal), Review & Select (demonstrate capability), Synced Confirmation (demonstrate value) — as in section 2.
- **Tone:** Calm and trustworthy, not hypey. One accent color, plain system fonts, no marketing filler.
- **Non-goals:** No design system, no login flow, no real Canvas/Google API integration — this is a mock-up meant to communicate the idea, not a working product.

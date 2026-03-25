A: Job of the first screen.

Question: In one sentence, what must a new host believe after 3 seconds?

Answer: “I can start a poll now! Oh, I see this app has already started the poll, and all I need to do is hit this button to see the QR code and join link that I can show to my friends/team or copy and paste into a text message, slack, or email?! Incredible! That was fast!”

Question: Is the first screen primarily marketing (sell the idea), orientation (where am I), or action (start/create immediately)?

Answer: The first screen is primarily for action ( start / create immediately)

Question: Who is the default person opening the app: logged-out prospect, logged-in host returning, or mixed?

Answer: Most users in the mobile app will be hosts. Most other users will be participants / guests using the app via the Apple "App Clip" experience. An App Clip is a lightweight version of an app that offers access to some of the app's functionality. A host will need to be logged in, and may return to the app several times a day or even per hour to create new agile scrum fist of five voting sessions. A guest "can" login, but it's optional for just voting ( unless a host configures his session to require authentication )

Question: If someone opens the app right before a meeting, what is the one outcome you refuse to bury behind beauty?

Answer: If someone opens the app, right before a meeting, the outcome I refuse to bury is the tally, the results of the voting session. Because in an in-person meeting, or virtual meeting with video cameras on, or in a chat room of that same meeting, a Scrum Master is meant to visually see the hands raised of his team or audience. People who show all 5 fingers are saying "I'm okay, all is well with me, and I feel confident in my life, or with the direction of our agile sprint" or all give fingers signifies "I am in 100% agreement with your statement, question, or proposal". The fewer fingers someone raises the less or opposite these statements become. Generally, anything else than a 4 is a sign there is an opportunity for the Scrum Master to talk to that individual as a group in that meeting or separately afterwards. So the outcome i refuse to bury in this application is the results of the voting session so i can easily see who voted what. ( I thought maybe the host can choose several options to visualize the results. A Table, a chart of dots, or circle graph. But that's an optional feature for the future fyi )

B. HOST promise vs the reference mock

Question: The reference UI shouts “all-in-one real-time polling” and social reactions. Your docs stress session creation, join URL, enter room. Which phrase is your canonical host promise for v1?

Answer: the reference UI is just a disposable UI reference I thought was visually compelling. None of the text is canonical for my needs. What I have in my docs is the way to go.

Question: Should the hero show a voting UI (fists 1–5), or avoid it to stay simple and “premium”? VIsually speaking I'm having trouble understanding what you are suggesting in your question would look like? The "Hero" for the mobile app, aka the first page the user arrives on, doesn't initially have a lot of data or content to show. I suspect my single button to start a session will leave an ugly amount of empty space with just the button being on the screen near the bottom. Then one day I saw the reference UI and I thought, "Hey, that's a cool, friendly looking UI that has a single button, and an inviting array of memojis filling the upper portions of the screen! And bonus, the button is contained in a black container which looks like a micro on-boarding flow at the same time? If it were real, i suspect the elipsis below the real time polling message would let me swipe right to the other messages for onboarding.

Question: Do you want first launch to emphasize speed (“under N taps to live session”) or trust (“works at scale / reliable”)?

Answer: “under N taps to live session” ( hopefully just one or so. start the live, then share the live ) My application will have many other buttons and features of course, but for someone looking to just start asap, this sounds like the fastest way to do it.

Question: Is participant experience allowed to appear on slide 1, or must slide 1 be host-only to avoid split attention?

Answer: I don't understand this question. A guest or participant experience can be via the mobile app, app clip, or thru a web browser for users who joined with the link. The only means a host experience and participant / guest experience will ever intermingle, is in the voting session itself where the host can visually see updates of the votes live as they happen, or change. ( I plan to use a third party platform called Ably to achieve that ). Visually speaking, a host will see things akin to "Reactions" as if the Host were running a youtube, instagram,facebook, or tiktok live stream. But obviously minus the video component. Emoticons appear on the screen moving left and right starting from the bottom and disappear after each vote or change of a vote. Is there a package or expo go friendly UI kit that can help me achieve that experience and look and feel for a voting session?

C. Conversion and routing

Question: What is the first committed action you want: Sign in, Create session as guest, Enter session code, or something else?

Answer: For a host, Sign in. With "Continue as guest" as an alternative that I would put behind a feature flag, initially set to "true" so I'd allow it, but later after user testing I may want to quickly disable it. I'm very skeptical if a host should ever be allowed to host a session without authenticating. But for now, I'll wait and see and allow continue as guest as an alternative.

Also, there will be no enter session code feature. ALL guests will join a sessino via QR code, or invite link which on web browsers takes them to the web browser version of the session and on mobile devices takes them to the web browser link as well unless they already have the app on their phone, in which case it takes them to the app. No sign in required for the guest. Is this logic possible?

Question: How does this relate to host intent before OAuth (host_intent_signup_signin_readme.md)? Should onboarding force a “I’m hosting” choice early?

Answer: THE HOST INTENT CHAT SHOULD BE NUKED, DELETED. IT was an idea I had about different signin flows for host and guest. I've since decided host intent is no longer needed. I thought I documented my newer direction in my documentation as well. I could be wrong.

Question: After onboarding, where should a host land: dashboard, blank new session, or resume last session?
Answer: The dashboard.

D. Content: copy and slides

How many onboarding slides are you willing to ship in v1 (0, 1, 3+)?

For each slide, what is the single idea — no more than one claim per slide?

What words do you ban (e.g. “real-time,” “AI,” “enterprise”) because they mis-set expectations?

What proof belongs on slide 1 if any: logos, numbers, “used in meetings,” or none?

To assist answering this question, visit MY website, my homepage for this application which is also the UI for the code located at /f5m.

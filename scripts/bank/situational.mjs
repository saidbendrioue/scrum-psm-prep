/**
 * Original PSM I situational items aligned to the Scrum Guide (2020).
 * Distractors model plausible accountability confusions and traditional
 * project habits — not absurd options. Not derived from confidential exams.
 */

export const situationalQuestions = [
  {
    category: 'Product Owner',
    difficulty: 'hard',
    question:
      'Mid-Sprint, a senior manager tells the Developers to drop the Sprint Goal and implement a marketing demo instead. The Product Owner is traveling and unreachable for two days. What should the Developers do?',
    options: [
      {
        id: 'a',
        text: 'Keep working toward the current Sprint Goal and the Sprint Backlog plan until the Product Owner can renegotiate scope with them',
      },
      {
        id: 'b',
        text: 'Immediately replace the Sprint Backlog with the manager’s request because managers outrank the Product Owner',
      },
      {
        id: 'c',
        text: 'Cancel the Sprint themselves, since the Sprint Goal appears threatened',
      },
      {
        id: 'd',
        text: 'Ask the Scrum Master to reorder the Product Backlog for the manager',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Only the Product Owner may cancel a Sprint, and Product Backlog ordering remains the Product Owner’s accountability. Developers self-manage how they meet the Sprint Goal; outsiders do not redirect the Sprint. When the Product Owner returns, scope may be renegotiated collaboratively if needed.',
    optionNotes: {
      a: 'Correct. The Sprint Goal and Product Owner accountability stand until the Product Owner acts.',
      b: 'Incorrect. Organizational hierarchy does not override Scrum accountabilities.',
      c: 'Incorrect. Developers cannot cancel a Sprint.',
      d: 'Incorrect. The Scrum Master does not own Product Backlog ordering.',
    },
    takeaway: 'Outside pressure does not rewrite the Sprint Goal or Product Backlog ownership.',
    reference: 'Scrum Guide (2020) — The Sprint; Product Owner; Developers',
  },
  {
    category: 'Sprint',
    difficulty: 'hard',
    question:
      'A competitor ships a feature that makes the current Sprint Goal commercially pointless. Stakeholders want the team to stop immediately. Who may cancel the Sprint, and on what basis?',
    options: [
      {
        id: 'a',
        text: 'Only the Product Owner may cancel the Sprint, and only if the Sprint Goal has become obsolete',
      },
      {
        id: 'b',
        text: 'The Scrum Master cancels the Sprint to protect the Developers from stakeholders',
      },
      {
        id: 'c',
        text: 'Stakeholders cancel the Sprint by majority vote at an emergency meeting',
      },
      {
        id: 'd',
        text: 'Developers cancel the Sprint if they forecast they cannot finish every selected item',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'A Sprint may be cancelled if the Sprint Goal becomes obsolete. Authority to cancel rests solely with the Product Owner, though others may influence that decision.',
    optionNotes: {
      a: 'Correct. Matches the Scrum Guide rule on Sprint cancellation.',
      b: 'Incorrect. The Scrum Master has no authority to cancel the Sprint.',
      c: 'Incorrect. Stakeholders do not cancel Sprints.',
      d: 'Incorrect. Incomplete forecasts are normal; they do not cancel the Sprint.',
    },
    takeaway: 'Cancellation is rare, goal-based, and Product Owner-only.',
    reference: 'Scrum Guide (2020) — The Sprint',
  },
  {
    category: 'Daily Scrum',
    difficulty: 'hard',
    question:
      'The Daily Scrum has become a status meeting where each Developer reports progress to the Scrum Master, who then assigns the day’s tasks. What should change?',
    options: [
      {
        id: 'a',
        text: 'Restore the Daily Scrum as a 15-minute event for the Developers to inspect progress toward the Sprint Goal and adapt the Sprint Backlog',
      },
      {
        id: 'b',
        text: 'Keep the reporting format; the Scrum Master must direct daily work to ensure delivery',
      },
      {
        id: 'c',
        text: 'Replace the Daily Scrum with a written status email to stakeholders',
      },
      {
        id: 'd',
        text: 'Invite the Product Owner to run the Daily Scrum and re-prioritize tasks each morning',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The Daily Scrum is for the Developers to inspect progress toward the Sprint Goal and adapt the Sprint Backlog. It improves focus and self-management. The Scrum Master may teach the Developers to keep it within 15 minutes, but does not turn it into personal task assignment.',
    optionNotes: {
      a: 'Correct. Purpose is Developer inspection and adaptation of their plan.',
      b: 'Incorrect. Assigning daily tasks undermines self-management.',
      c: 'Incorrect. Skipping the event loses a formal inspect-and-adapt opportunity.',
      d: 'Incorrect. The Product Owner does not run the Daily Scrum as a prioritization ceremony.',
    },
    takeaway: 'Daily Scrum serves Developer self-management, not reporting up.',
    reference: 'Scrum Guide (2020) — Daily Scrum',
  },
  {
    category: 'Sprint Planning',
    difficulty: 'hard',
    question:
      'During Sprint Planning, the Product Owner insists the Developers pull twice as many Product Backlog items as their past capacity suggests, “to create stretch pressure.” The Definition of Done is unchanged. What is the appropriate response?',
    options: [
      {
        id: 'a',
        text: 'Developers select what they forecast they can Done this Sprint through discussion with the Product Owner; nobody else dictates the amount',
      },
      {
        id: 'b',
        text: 'Accept the Product Owner’s forced scope because maximizing value means maximizing the number of items started',
      },
      {
        id: 'c',
        text: 'Let the Scrum Master set the item count using average velocity alone',
      },
      {
        id: 'd',
        text: 'Lower the Definition of Done for this Sprint so more items can be marked complete',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Through discussion with the Product Owner, the Developers select items for the Sprint. Forecasts consider past performance, capacity, and the Definition of Done. Weakening Done to inflate counts reduces transparency and quality.',
    optionNotes: {
      a: 'Correct. Selection of “what” for the Sprint is a Developer forecast.',
      b: 'Incorrect. Starting more work does not maximize value if quality and Done suffer.',
      c: 'Incorrect. The Scrum Master does not set the Sprint forecast.',
      d: 'Incorrect. Gaming Done breaks empiricism.',
    },
    takeaway: 'Developers own the Sprint forecast against a real Definition of Done.',
    reference: 'Scrum Guide (2020) — Sprint Planning; Definition of Done',
  },
  {
    category: 'Sprint Backlog',
    difficulty: 'hard',
    question:
      'Three days into a Sprint, Developers learn the selected work will not achieve the Sprint Goal as planned. What may they do?',
    options: [
      {
        id: 'a',
        text: 'Collaborate with the Product Owner to renegotiate the scope of the Sprint Backlog within the Sprint without changing the Sprint Goal',
      },
      {
        id: 'b',
        text: 'Silently drop quality criteria from the Definition of Done to finish more items',
      },
      {
        id: 'c',
        text: 'Ask the Scrum Master to replace the Sprint Goal with an easier one',
      },
      {
        id: 'd',
        text: 'Add unplanned stakeholder requests without talking to the Product Owner',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'If the work turns out to be different than expected, the Developers collaborate with the Product Owner to negotiate the scope of the Sprint Backlog within the Sprint without affecting the Sprint Goal.',
    optionNotes: {
      a: 'Correct. Scope may be renegotiated; the Sprint Goal remains the commitment.',
      b: 'Incorrect. Done is not optional quality.',
      c: 'Incorrect. The Sprint Goal is not rewritten mid-Sprint by the Scrum Master.',
      d: 'Incorrect. Product Backlog changes go through the Product Owner.',
    },
    takeaway: 'Adapt the plan and scope; keep the Sprint Goal as the why.',
    reference: 'Scrum Guide (2020) — The Sprint; Sprint Backlog',
  },
  {
    category: 'Definition of Done',
    difficulty: 'hard',
    question:
      'At Sprint Review, Developers want to demo a nearly finished item that still fails an automated regression check required by the Definition of Done. Stakeholders are eager to see it. What should happen?',
    options: [
      {
        id: 'a',
        text: 'Do not present it as part of the Increment; return the unfinished work to the Product Backlog for later consideration',
      },
      {
        id: 'b',
        text: 'Present it as Done because stakeholders asked to see progress',
      },
      {
        id: 'c',
        text: 'Have the Product Owner override the Definition of Done for this Review only',
      },
      {
        id: 'd',
        text: 'Count it in the Increment if the Scrum Master personally tested the happy path',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Work cannot be considered part of an Increment unless it meets the Definition of Done. If it does not meet Done, it cannot be released or even presented at the Sprint Review; it returns to the Product Backlog.',
    optionNotes: {
      a: 'Correct. Done gates what may be shown as Increment.',
      b: 'Incorrect. Stakeholder curiosity does not redefine Done.',
      c: 'Incorrect. The Product Owner does not waive Done for demos.',
      d: 'Incorrect. Informal testing does not replace the Definition of Done.',
    },
    takeaway: 'Only Done work is Increment work.',
    reference: 'Scrum Guide (2020) — Increment; Commitment: Definition of Done',
  },
  {
    category: 'Scrum Master',
    difficulty: 'hard',
    question:
      'Developers are stuck behind a slow security approval queue owned by another department. They can still make some progress, but the Sprint Goal is at risk. How should the Scrum Master act?',
    options: [
      {
        id: 'a',
        text: 'Cause the impediment to be removed by coaching the organization and helping remove barriers, while Developers continue adapting their plan',
      },
      {
        id: 'b',
        text: 'Personally write all remaining Product Backlog items so Developers are not blocked',
      },
      {
        id: 'c',
        text: 'Order the Developers to stop self-managing and wait idle until security replies',
      },
      {
        id: 'd',
        text: 'Cancel the Sprint without involving the Product Owner',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The Scrum Master is accountable for the Scrum Team’s effectiveness and for causing the removal of impediments. That often means organizational coaching and barrier removal, not replacing Developers or cancelling the Sprint unilaterally.',
    optionNotes: {
      a: 'Correct. Servant leadership through removing organizational barriers.',
      b: 'Incorrect. The Scrum Master is not the backup Product Owner or sole coder by mandate.',
      c: 'Incorrect. Idle waiting undermines focus and self-management.',
      d: 'Incorrect. Only the Product Owner may cancel a Sprint.',
    },
    takeaway: 'Scrum Masters cause impediment removal across the organization.',
    reference: 'Scrum Guide (2020) — Scrum Master',
  },
  {
    category: 'Product Backlog',
    difficulty: 'hard',
    question:
      'A stakeholder insists a new request must jump to the top of the Product Backlog during the Sprint. The Product Owner disagrees. Who decides?',
    options: [
      {
        id: 'a',
        text: 'The Product Owner decides Product Backlog content and order; people wanting a change address the Product Owner',
      },
      {
        id: 'b',
        text: 'The stakeholder wins because they fund the product',
      },
      {
        id: 'c',
        text: 'Developers vote, because they will implement the work',
      },
      {
        id: 'd',
        text: 'The Scrum Master reorders the backlog to keep peace',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The Product Owner is accountable for effective Product Backlog management, including ordering. For the Product Owner to succeed, the organization must respect those decisions. Stakeholders influence; they do not seize the backlog.',
    optionNotes: {
      a: 'Correct. One Product Owner, one ordered backlog.',
      b: 'Incorrect. Funding does not override Product Owner accountability.',
      c: 'Incorrect. Developers size and select Sprint work; they do not own backlog order.',
      d: 'Incorrect. The Scrum Master does not reorder the Product Backlog.',
    },
    takeaway: 'Backlog order is a Product Owner decision made transparent to all.',
    reference: 'Scrum Guide (2020) — Product Owner; Product Backlog',
  },
  {
    category: 'Sprint Review',
    difficulty: 'hard',
    question:
      'During Sprint Review, stakeholders demand that unfinished items be marked complete so the release metrics look green. What should the Scrum Team do?',
    options: [
      {
        id: 'a',
        text: 'Keep unfinished work out of the Increment, discuss progress and Product Backlog adaptations honestly, and preserve transparency',
      },
      {
        id: 'b',
        text: 'Mark the items Done to satisfy the metrics, then fix quality next Sprint',
      },
      {
        id: 'c',
        text: 'Hide the Sprint Review from stakeholders until everything is green',
      },
      {
        id: 'd',
        text: 'Let finance redefine Done for reporting purposes',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The Sprint Review inspects the outcome of the Sprint and determines future adaptations. Transparency about what is and is not Done is essential to empiricism. Faking Done destroys inspection.',
    optionNotes: {
      a: 'Correct. Review is for honest inspection and backlog adaptation.',
      b: 'Incorrect. False Done breaks the Increment commitment.',
      c: 'Incorrect. Skipping stakeholders reduces transparency.',
      d: 'Incorrect. Done is a product quality standard, not a reporting convenience.',
    },
    takeaway: 'Sprint Review depends on a truthful Increment.',
    reference: 'Scrum Guide (2020) — Sprint Review; Definition of Done',
  },
  {
    category: 'Sprint Retrospective',
    difficulty: 'hard',
    question:
      'After several Sprints, the same quality escapes keep recurring. In the Retrospective, management wants only a feel-good discussion with no changes. What is the Scrum intent?',
    options: [
      {
        id: 'a',
        text: 'Plan ways to increase quality and effectiveness, including adapting the Definition of Done as appropriate, and implement improvements as soon as possible',
      },
      {
        id: 'b',
        text: 'Skip improvements if delivery pressure is high; Retrospectives are optional',
      },
      {
        id: 'c',
        text: 'Assign individual blame scores and remove the lowest-rated Developer',
      },
      {
        id: 'd',
        text: 'Let the Product Owner alone decide process changes without the Developers',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The purpose of the Sprint Retrospective is to plan ways to increase quality and effectiveness. The Scrum Team inspects how the last Sprint went and the most impactful improvements are addressed as soon as possible, possibly adapting the Definition of Done.',
    optionNotes: {
      a: 'Correct. Retrospective exists to produce actionable improvement.',
      b: 'Incorrect. Prescribed events are not optional.',
      c: 'Incorrect. Individual blame contests are not Scrum.',
      d: 'Incorrect. The whole Scrum Team owns the Retrospective.',
    },
    takeaway: 'Retrospectives create the next improvement, often into the Sprint Backlog.',
    reference: 'Scrum Guide (2020) — Sprint Retrospective',
  },
  {
    category: 'Developers',
    difficulty: 'hard',
    question:
      'The Product Owner asks Developers mid-Sprint to change how they decompose work and which engineering approach they use. Developers disagree. Who decides how the work gets done?',
    options: [
      {
        id: 'a',
        text: 'The Developers, at their sole discretion, decide how to turn Product Backlog items into a Done Increment',
      },
      {
        id: 'b',
        text: 'The Product Owner decides the engineering approach because they maximize value',
      },
      {
        id: 'c',
        text: 'The Scrum Master dictates the technical design as process owner',
      },
      {
        id: 'd',
        text: 'An architecture board outside the Scrum Team must approve every task',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'How selected work is turned into Increments of value is at the sole discretion of the Developers. No one else tells them how.',
    optionNotes: {
      a: 'Correct. “How” belongs to Developers.',
      b: 'Incorrect. Value ownership is not the same as directing implementation.',
      c: 'Incorrect. Scrum Master coaches the framework; does not own technical design.',
      d: 'Incorrect. External command structures conflict with self-management.',
    },
    takeaway: 'Self-managing includes who does what, when, and how.',
    reference: 'Scrum Guide (2020) — Sprint Planning; The Scrum Team',
  },
  {
    category: 'Scrum Team',
    difficulty: 'hard',
    question:
      'An organization wants a separate “testing Scrum Team” that receives Increments from a “development Scrum Team” each Sprint. What does the Scrum Guide imply?',
    options: [
      {
        id: 'a',
        text: 'A Scrum Team has no sub-teams or hierarchies and is cross-functional enough to create value each Sprint',
      },
      {
        id: 'b',
        text: 'Hand-offs between specialized Scrum Teams are the preferred scaling pattern',
      },
      {
        id: 'c',
        text: 'Testing must always be a later Sprint after development',
      },
      {
        id: 'd',
        text: 'Only Developers need to be cross-functional; Product Owner and Scrum Master stay outside the team',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The Scrum Team is a cohesive unit of professionals focused on one product goal, with no sub-teams such as testing or business analysis, and no hierarchies. Cross-functionality means the team has all skills needed to create value each Sprint.',
    optionNotes: {
      a: 'Correct. No mini-waterfall inside Scrum Team structure.',
      b: 'Incorrect. Hand-off chains recreate waterfall delays.',
      c: 'Incorrect. Done Increments include the quality work needed to release.',
      d: 'Incorrect. All three accountabilities are inside one Scrum Team.',
    },
    takeaway: 'One team, no sub-team hand-offs for a single Increment.',
    reference: 'Scrum Guide (2020) — The Scrum Team',
  },
  {
    category: 'Increment',
    difficulty: 'hard',
    question:
      'Developers create two usable Increments during a Sprint and want to release one to customers before Sprint Review. Stakeholders say releases may happen only at Review. Who is right?',
    options: [
      {
        id: 'a',
        text: 'An Increment may be delivered to stakeholders prior to the end of the Sprint; Sprint Review is not a release gate',
      },
      {
        id: 'b',
        text: 'Nothing may be released until Sprint Review formally approves it',
      },
      {
        id: 'c',
        text: 'Only the Scrum Master can authorize mid-Sprint releases',
      },
      {
        id: 'd',
        text: 'Multiple Increments in one Sprint are forbidden',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Multiple Increments may be created within a Sprint. An Increment may be delivered to stakeholders prior to the end of the Sprint. The Sprint Review should never be considered a gate to releasing value.',
    optionNotes: {
      a: 'Correct. Review supports empiricism; it is not a release committee.',
      b: 'Incorrect. Common traditional habit, not Scrum.',
      c: 'Incorrect. Release decisions are not a Scrum Master monopoly.',
      d: 'Incorrect. Multiple Increments per Sprint are allowed.',
    },
    takeaway: 'Done Increments can release whenever they are valuable.',
    reference: 'Scrum Guide (2020) — Increment',
  },
  {
    category: 'Product Owner',
    difficulty: 'hard',
    question:
      'The Product Owner delegates writing and ordering of many Product Backlog items to Developers. A stakeholder later claims “nobody is accountable.” What is true?',
    options: [
      {
        id: 'a',
        text: 'The Product Owner remains accountable for effective Product Backlog management even when work is delegated',
      },
      {
        id: 'b',
        text: 'Accountability transfers fully to the Developers who performed the delegated work',
      },
      {
        id: 'c',
        text: 'Accountability disappears once delegation occurs',
      },
      {
        id: 'd',
        text: 'The Scrum Master becomes accountable for backlog order',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The Product Owner may do Product Backlog management or delegate the responsibility to others. Regardless, the Product Owner remains accountable.',
    optionNotes: {
      a: 'Correct. Delegation does not remove accountability.',
      b: 'Incorrect. Doing the work is not the same as owning accountability.',
      c: 'Incorrect. Accountability cannot vanish.',
      d: 'Incorrect. Backlog accountability is not a Scrum Master duty.',
    },
    takeaway: 'One Product Owner remains accountable for the backlog.',
    reference: 'Scrum Guide (2020) — Product Owner',
  },
  {
    category: 'Scrum Theory',
    difficulty: 'hard',
    question:
      'A team runs two-week Sprints but skips Sprint Retrospective whenever “things went fine,” and sometimes skips Daily Scrum when remote. Is this still Scrum?',
    options: [
      {
        id: 'a',
        text: 'No. The Scrum framework is immutable; implementing only parts of Scrum is not Scrum, and skipping events loses inspect-and-adapt opportunities',
      },
      {
        id: 'b',
        text: 'Yes, as long as something is delivered each month',
      },
      {
        id: 'c',
        text: 'Yes, because events are suggestions, not part of the framework',
      },
      {
        id: 'd',
        text: 'Only the Retrospective is optional; Daily Scrum remains required',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'While implementing only parts of Scrum is possible, the result is not Scrum. Events create regularity and formal opportunities to inspect and adapt; failing to hold a prescribed event reduces transparency.',
    optionNotes: {
      a: 'Correct. Immutability of the framework is explicit.',
      b: 'Incorrect. Delivery cadence alone does not define Scrum.',
      c: 'Incorrect. Events are defined elements of Scrum.',
      d: 'Incorrect. Both are prescribed events.',
    },
    takeaway: 'Partial Scrum is not Scrum.',
    reference: 'Scrum Guide (2020) — End Note; Scrum Events',
  },
  {
    category: 'Scrum Master',
    difficulty: 'hard',
    question:
      'Leadership asks the Scrum Master to rate each Developer’s individual productivity for annual bonuses using Daily Scrum notes. What should the Scrum Master do?',
    options: [
      {
        id: 'a',
        text: 'Refuse to turn Scrum events into individual performance surveillance and coach the organization toward empiricism and self-managing teams',
      },
      {
        id: 'b',
        text: 'Comply, because the Scrum Master owns individual appraisals',
      },
      {
        id: 'c',
        text: 'Publish a leaderboard after every Daily Scrum',
      },
      {
        id: 'd',
        text: 'Ask Developers to vote on each other’s bonuses during Retrospective',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Scrum Masters serve the organization by helping people understand empiricism and by supporting self-managing teams. Using the Daily Scrum as appraisal surveillance undermines openness, respect, and self-management.',
    optionNotes: {
      a: 'Correct. Protect the purpose of events and coach the organization.',
      b: 'Incorrect. Scrum Master is not an HR rater by Scrum definition.',
      c: 'Incorrect. Gamified personal ranking harms the values.',
      d: 'Incorrect. Retrospective is for team improvement, not pay votes.',
    },
    takeaway: 'Scrum events are not performance appraisal ceremonies.',
    reference: 'Scrum Guide (2020) — Scrum Master; Scrum Values; Daily Scrum',
  },
  {
    category: 'Sprint Planning',
    difficulty: 'hard',
    question:
      'Sprint Planning is ending and the Scrum Team still has no Sprint Goal. Developers have selected items. What must be true before Planning ends?',
    options: [
      {
        id: 'a',
        text: 'The Sprint Goal must be finalized prior to the end of Sprint Planning',
      },
      {
        id: 'b',
        text: 'The Sprint Goal can be invented on day three once work is clearer',
      },
      {
        id: 'c',
        text: 'Only the Product Owner needs a private Sprint Goal',
      },
      {
        id: 'd',
        text: 'A Sprint Goal is optional when the backlog is clear',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The Product Owner proposes how the Sprint could increase value and utility; the whole Scrum Team collaborates to define a Sprint Goal. The Sprint Goal must be finalized prior to the end of Sprint Planning.',
    optionNotes: {
      a: 'Correct. Timing is explicit in the Guide.',
      b: 'Incorrect. Waiting mid-Sprint removes the commitment that guides adaptation.',
      c: 'Incorrect. The Goal is for the Scrum Team and stakeholders.',
      d: 'Incorrect. Sprint Goal is the Sprint Backlog commitment.',
    },
    takeaway: 'No Sprint Planning ends without a Sprint Goal.',
    reference: 'Scrum Guide (2020) — Sprint Planning; Sprint Backlog',
  },
  {
    category: 'Product Backlog',
    difficulty: 'hard',
    type: 'multiple',
    question:
      'Select all that apply. Which statements about Product Backlog refinement are true?',
    options: [
      {
        id: 'a',
        text: 'Refinement is the act of breaking down and further defining Product Backlog items into smaller, more precise items',
      },
      {
        id: 'b',
        text: 'Refinement is an ongoing activity to add details such as description, order, and size',
      },
      {
        id: 'c',
        text: 'Refinement is a mandatory fifth Scrum event with a fixed timebox equal to Daily Scrum',
      },
      {
        id: 'd',
        text: 'Attributes of Product Backlog items often vary with the domain of work',
      },
    ],
    correctOptionIds: ['a', 'b', 'd'],
    explanation:
      'Refinement breaks items down and adds detail such as description, order, and size. It is an ongoing activity, not a formal Scrum event. Attributes often vary by domain.',
    optionNotes: {
      a: 'Correct.',
      b: 'Correct.',
      c: 'Incorrect. Refinement is not a fifth event.',
      d: 'Correct.',
    },
    takeaway: 'Refinement is continuous work, not an extra ceremony.',
    reference: 'Scrum Guide (2020) — Product Backlog',
  },
  {
    category: 'Daily Scrum',
    difficulty: 'medium',
    question:
      'The Product Owner wants to attend the Daily Scrum every day to redirect Developers. What is allowed?',
    options: [
      {
        id: 'a',
        text: 'Others may attend, but the Developers remain responsible for conducting the Daily Scrum and it remains focused on progress toward the Sprint Goal',
      },
      {
        id: 'b',
        text: 'The Product Owner must run the Daily Scrum and assign tasks',
      },
      {
        id: 'c',
        text: 'Anyone outside the Developers is forbidden from being present under any circumstance',
      },
      {
        id: 'd',
        text: 'Stakeholders vote during Daily Scrum on what to build next',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'If the Product Owner or Scrum Master are actively working on Sprint Backlog items, they participate as Developers. The Daily Scrum is still for the Developers to produce an actionable plan for the next day of work. Others may attend, but Developers run it.',
    optionNotes: {
      a: 'Correct. Attendance is possible; ownership of the event stays with Developers.',
      b: 'Incorrect. Turns the event into command-and-control.',
      c: 'Incorrect. The Guide allows others to attend.',
      d: 'Incorrect. Ordering product work is not a Daily Scrum activity.',
    },
    takeaway: 'Daily Scrum stays a Developer planning event.',
    reference: 'Scrum Guide (2020) — Daily Scrum',
  },
  {
    category: 'Scrum Values',
    difficulty: 'hard',
    question:
      'A Developer hides a production-risk discovery until after Sprint Review to avoid “looking bad.” Which Scrum value is most directly undermined, and why does it matter?',
    options: [
      {
        id: 'a',
        text: 'Openness (and thereby empiricism): without transparency, inspection is misleading and adaptation suffers',
      },
      {
        id: 'b',
        text: 'Obedience: the Developer failed to follow a manager’s reporting template',
      },
      {
        id: 'c',
        text: 'Nothing; hiding risk until Review is a valid forecasting technique',
      },
      {
        id: 'd',
        text: 'Only Focus is affected, because the Review agenda was shorter',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Openness means the Scrum Team and stakeholders are open about the work and the challenges. Transparency enables inspection; inspection without transparency is misleading and wasteful.',
    optionNotes: {
      a: 'Correct. Hidden risk breaks transparency and empiricism.',
      b: 'Incorrect. Obedience is not a Scrum value.',
      c: 'Incorrect. Hiding risk is anti-empirical.',
      d: 'Incorrect. The core damage is to openness and transparency.',
    },
    takeaway: 'Scrum values make the empirical pillars usable.',
    reference: 'Scrum Guide (2020) — Scrum Values; Transparency',
  },
  {
    category: 'Scaling',
    difficulty: 'hard',
    question:
      'Three Scrum Teams work on one product. Each wants its own Definition of Done with different quality bars so “faster” teams are not slowed down. What does Scrum require?',
    options: [
      {
        id: 'a',
        text: 'If multiple Scrum Teams work together on a product, they must mutually define and comply with the same Definition of Done',
      },
      {
        id: 'b',
        text: 'Each team may keep incompatible Done definitions forever',
      },
      {
        id: 'c',
        text: 'Only the fastest team’s Done applies to the product',
      },
      {
        id: 'd',
        text: 'Done is unnecessary when scaling',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'When multiple Scrum Teams work on one product, they must mutually define and comply with the same Definition of Done. Organizational standards are a minimum if they exist.',
    optionNotes: {
      a: 'Correct. Shared Done protects a coherent product Increment.',
      b: 'Incorrect. Incompatible Done destroys integrated transparency.',
      c: 'Incorrect. Speed does not set quality policy alone.',
      d: 'Incorrect. Done is required for an Increment.',
    },
    takeaway: 'One product, one shared Definition of Done across teams.',
    reference: 'Scrum Guide (2020) — Commitment: Definition of Done',
  },
  {
    category: 'Sprint',
    difficulty: 'hard',
    question:
      'Near the end of a Sprint, Developers realize they will not complete every selected Product Backlog item, but the Sprint Goal is still achievable with a smaller set of Done work. What should they do?',
    options: [
      {
        id: 'a',
        text: 'Focus on achieving the Sprint Goal with a usable Done Increment; unfinished items return to the Product Backlog',
      },
      {
        id: 'b',
        text: 'Extend the Sprint by a few days until every selected item is finished',
      },
      {
        id: 'c',
        text: 'Declare all selected items Done to protect velocity charts',
      },
      {
        id: 'd',
        text: 'Cancel the Sprint automatically because not everything finished',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Sprints are fixed length and create consistency. The Sprint Goal provides flexibility regarding the exact work needed. Work not meeting Done returns to the Product Backlog. Extending the Sprint or faking Done breaks empiricism.',
    optionNotes: {
      a: 'Correct. Goal over item checklist; Done remains Done.',
      b: 'Incorrect. Sprint timeboxes do not stretch casually.',
      c: 'Incorrect. Velocity vanity destroys transparency.',
      d: 'Incorrect. Incomplete item lists do not auto-cancel Sprints.',
    },
    takeaway: 'Protect the Sprint Goal and Done; do not stretch the Sprint.',
    reference: 'Scrum Guide (2020) — The Sprint; Sprint Goal; Definition of Done',
  },
  {
    category: 'Scrum Master',
    difficulty: 'medium',
    type: 'multiple',
    question:
      'Select all that apply. Which are ways the Scrum Master serves the Product Owner?',
    options: [
      {
        id: 'a',
        text: 'Helping find techniques for effective Product Goal definition and Product Backlog management',
      },
      {
        id: 'b',
        text: 'Helping the Scrum Team understand the need for clear and concise Product Backlog items',
      },
      {
        id: 'c',
        text: 'Helping establish empirical product planning for a complex environment',
      },
      {
        id: 'd',
        text: 'Ordering the Product Backlog when the Product Owner is busy',
      },
    ],
    correctOptionIds: ['a', 'b', 'c'],
    explanation:
      'The Scrum Master serves the Product Owner through techniques for Product Goal and backlog management, clarity of items, empirical product planning, and facilitating stakeholder collaboration as needed. The Scrum Master does not take over backlog ordering accountability.',
    optionNotes: {
      a: 'Correct.',
      b: 'Correct.',
      c: 'Correct.',
      d: 'Incorrect. Ordering remains Product Owner accountability.',
    },
    takeaway: 'Scrum Masters coach Product Owners; they do not become shadow Product Owners.',
    reference: 'Scrum Guide (2020) — Scrum Master',
  },
  {
    category: 'Developers',
    difficulty: 'medium',
    question:
      'Who is responsible for sizing Product Backlog items when the Product Owner asks for estimates before Sprint Planning?',
    options: [
      {
        id: 'a',
        text: 'The Developers who will do the work are responsible for the sizing',
      },
      {
        id: 'b',
        text: 'The Product Owner alone, using business value points',
      },
      {
        id: 'c',
        text: 'The Scrum Master, using a mandated corporate scale',
      },
      {
        id: 'd',
        text: 'Stakeholders who requested the features',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The Developers who will perform the work are responsible for the sizing. The Product Owner may influence Developers by helping them understand trade-offs.',
    optionNotes: {
      a: 'Correct.',
      b: 'Incorrect. Value and order differ from sizing accountability.',
      c: 'Incorrect. Scrum does not assign sizing to the Scrum Master.',
      d: 'Incorrect. Requestors do not size implementation work.',
    },
    takeaway: 'Those who do the work size the work.',
    reference: 'Scrum Guide (2020) — Product Backlog',
  },
  {
    category: 'Sprint Review',
    difficulty: 'medium',
    question:
      'What is the primary outcome expected from a Sprint Review?',
    options: [
      {
        id: 'a',
        text: 'Inspection of the Sprint’s outcome and adaptation of the Product Backlog as needed',
      },
      {
        id: 'b',
        text: 'Formal approval gate before any Increment may ever be released',
      },
      {
        id: 'c',
        text: 'Individual performance ratings for Developers',
      },
      {
        id: 'd',
        text: 'Replacement of Sprint Retrospective when time is short',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The purpose of the Sprint Review is to inspect the outcome of the Sprint and determine future adaptations. The Scrum Team presents results to key stakeholders and progress toward the Product Goal is discussed; the Product Backlog may be adjusted.',
    optionNotes: {
      a: 'Correct.',
      b: 'Incorrect. Review is not a release gate.',
      c: 'Incorrect. Not an appraisal meeting.',
      d: 'Incorrect. Retrospective remains a separate event.',
    },
    takeaway: 'Sprint Review inspects product outcome and adapts the backlog.',
    reference: 'Scrum Guide (2020) — Sprint Review',
  },
  {
    category: 'Artifacts',
    difficulty: 'medium',
    type: 'multiple',
    question:
      'Select all that apply. Which commitments are associated with Scrum artifacts?',
    options: [
      { id: 'a', text: 'Product Goal for the Product Backlog' },
      { id: 'b', text: 'Sprint Goal for the Sprint Backlog' },
      { id: 'c', text: 'Definition of Done for the Increment' },
      { id: 'd', text: 'Utilization target for each Developer' },
    ],
    correctOptionIds: ['a', 'b', 'c'],
    explanation:
      'Each artifact contains a commitment to enhance transparency and focus against which progress can be measured: Product Goal, Sprint Goal, and Definition of Done.',
    optionNotes: {
      a: 'Correct.',
      b: 'Correct.',
      c: 'Correct.',
      d: 'Incorrect. Individual utilization targets are not Scrum commitments.',
    },
    takeaway: 'Three artifacts, three commitments.',
    reference: 'Scrum Guide (2020) — Scrum Artifacts',
  },
  {
    category: 'Product Owner',
    difficulty: 'medium',
    question:
      'The Product Owner is unavailable for several days. Stakeholders ask the Scrum Master to temporarily become Product Owner and reorder the backlog. What should happen?',
    options: [
      {
        id: 'a',
        text: 'Keep a single Product Owner accountability; do not create a rotating committee of owners, and escalate availability as an organizational impediment',
      },
      {
        id: 'b',
        text: 'The Scrum Master should silently assume Product Owner ordering rights',
      },
      {
        id: 'c',
        text: 'Stakeholders should reorder the Product Backlog until the Product Owner returns',
      },
      {
        id: 'd',
        text: 'Developers should elect a temporary Product Owner each morning',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'The Product Owner is one person, not a committee. Temporary shadow ownership by the Scrum Master or stakeholders creates conflicting directions. Availability of the Product Owner is an organizational concern the Scrum Master may help address.',
    optionNotes: {
      a: 'Correct. Preserve one owner; fix the availability problem.',
      b: 'Incorrect. Role blending without clarity breaks accountability.',
      c: 'Incorrect. Stakeholders do not own backlog order.',
      d: 'Incorrect. Daily elections recreate a committee.',
    },
    takeaway: 'One Product Owner — even when that person needs better organizational support.',
    reference: 'Scrum Guide (2020) — Product Owner; Scrum Master',
  },
  {
    category: 'Scrum Events',
    difficulty: 'medium',
    question:
      'A team wants to add a mandatory “refinement meeting” as a sixth formal Scrum event with the same status as Sprint Review. What is accurate?',
    options: [
      {
        id: 'a',
        text: 'Refinement is an ongoing activity; teams may schedule collaboration time, but Scrum does not define refinement as a formal event',
      },
      {
        id: 'b',
        text: 'Refinement must be added as a formal event or the team is not doing Scrum',
      },
      {
        id: 'c',
        text: 'Refinement replaces Sprint Planning Topic Two',
      },
      {
        id: 'd',
        text: 'Only the Scrum Master may refine the Product Backlog',
      },
    ],
    correctOptionIds: ['a'],
    explanation:
      'Product Backlog refinement is an ongoing activity to add details and break items down. Teams often collaborate on it, but it is not one of the Scrum events. Adding practices is fine; calling them mandatory Scrum events invents rules.',
    optionNotes: {
      a: 'Correct. Practice may exist; formal event status does not.',
      b: 'Incorrect. Invents a rule.',
      c: 'Incorrect. Planning still addresses what can be Done this Sprint.',
      d: 'Incorrect. Refinement involves the Product Owner and often Developers.',
    },
    takeaway: 'Do not invent extra Scrum events; refinement stays an activity.',
    reference: 'Scrum Guide (2020) — Product Backlog; Scrum Events',
  },
];

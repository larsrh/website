---
title: "Routing the technical interview"
date: 2021-03-10
lang: en
highlight: true
hero:
  src: "img/ship.jpg"
  alt: "Blue and red boat on sea under white clouds during daytime"
  credits: "Andrey Sharpilo"
---

“Welcome, Nephele!” he said.

The interviewer couldn't help but notice her name, _Nephele_.
It sounds Greek.
But he didn't ask, not wanting to get off on the wrong foot with the promising candidate.
He made a mental note to look up the name afterwards.

“I believe HR already told you the basics?”

“Yes,” she responded, “I am very excited about this position.”

“I consider myself to be a full-stack engineer.
Whether there's something that needs fixing in the engine room, or you need me on the bridge, I'll be right there.”

He was glad to hear that.
If anything, they needed people who were flexible, who didn't just work in a silo.

“That's great!”

Even though she had submitted a strong application with all sorts of references, he wanted her to do some coding in the interview.
After all, he wanted to make sure that she was a good team player, someone to rely on when you needed all hands on deck.
In their stealth-mode startup, they didn't need shut-ins.

But he was also a very considerate person, and knew that many people dreaded a whiteboard interview.
At a previous job, he was berated for making someone reverse a binary tree.
After _The Incident_, as he called it, he wanted to be sure not to put anyone on the spot like that again.

So he changed strategy.
He picked a classic exercise and told the candidate beforehand that she could bring her own laptop to solve a simple coding problem, and that she could use any technology to solve it.

“Let's get started. Did you bring your laptop?”

”Of course,” she said eagerly, “because what would a helmswoman be without a wheel?”

He laughed.
“Nautical metaphors, that's funny.”

She looked back at him quizzically.

“What metaphors?”

His heart raced.
Did he say something wrong?
Was he going to get sued?

“Oh, nothing. Sorry. I thought you were making a joke.”

He tried to rescue the situation.

“Let's move on to the coding problem, shall we?”

Her face regained its enthusiasm.
He let out a barely audible sigh, relieved that he dodged a bullet there, and made another mental note that hiring women is hard; he should tread more carefully.

“Have you heard of FizzBuzz?”

She did not immediately respond, pondering the question, apparently not knowing what he was talking about.
After what felt like ages, she replied, choosing her words very carefully, “Is that related to HarfBuzz?
Because unfortunately that is not my area of expertise.”

He paused.
_What the hell is HarfBuzz?,_ he thought.

“No, not at all,” he said, pretending to know what she meant.
“FizzBuzz is a simple exercise.
It's based on a child's game.”

She looked skeptical.

“Think of the numbers from 1 to 100 –”

“Natural numbers?”, she interrupted.

“– yes. Integers.”

He was confused.
Why would she ask that?
What other numbers could he have meant?

He tried his best to hide his confusion and continued.

“The goal is to print these numbers, but if the number is divisible by three, print `Fizz` instead, and if the number is divisible by five, print `Buzz` instead.”

She contemplated what he had said, carefully mulling over the nature of the problem.

_This does not bode well,_ the interviewer felt.
Were her credentials even real?
Before he could dwell on this further, she spoke up.

“The rules you specified are nondeterministic!” she exclaimed.

“If the number is divisible by fifteen, there are two possible options.
Which one is preferred?”

“Sorry, I forgot to mention that.
In that case, print `FizzBuzz`.”

Without skipping a beat, she continued.

“Sounds simple enough, that's just monoidal.
Decent way to resolve the ambiguity.”

He had no idea what she just said.
She claimed to have studied Computer Science, but perhaps it was just her minor, and she actually majored in Mathematics.
The company does not need thinkers, they need doers.
Mathematicians just examine made-up problems.
But at this company, the engineers build real products for real people.

At this point, he was pretty sure that Nephele would not be a culture fit.
But he didn't want to be rude, so he decided to keep going with the interview.

“I believe you told me that I could use any technology to solve this problem?”

“That's right.
Which programming language are you most familiar with?”

She had a big grin on her face.

“YAML.”

Now he was thoroughly confused, and didn't know what to say.
That didn't happen very often.
He always knew what to say.
He never beat around the bush, always saying what had to be said, no matter the consequences.

“YAML?”, he said, coyly.

“Yes, YAML!
The job description specifically mentioned DevOps, didn't it?”

His confusion now turned into complete bewilderment.

“That's true, but what's that got to do with –”

He couldn't finish his sentence.
His candidate was as enthusiastic as he was perplexed.

“Great! I will solve this problem with Kubernetes.”

His bewilderment turned into something else.
He now thought he understood what she meant.
_She's joking again._
_She merely wants to deploy her FizzBuzz implementation in Kubernetes._

He laughed.

“Scaling is very important!
We also containerize our code and deploy it on our Kubernetes cluster.
We're cloud native!”

“_Native_, that's my middle name,” Nephele mumbled to herself.

He ignored her remark and proceeded: “Typically, we implement our backends in Go.
Will you also choose Go to solve this problem?”

She looked quizzically, again.

“I already told you: I am going to use YAML. _No-code_, if you wish.”

He was back at bewilderment, thinking out loud, trying to process what she just said.

“But how are you going to – I mean, you need some logic, so – How would you even –”

Nephele did not seem impressed by his thought process.
As if she was feeling sorry for him, she started explaining her choice.

“You see, I am a strong believer in the _Principle of Least Power._”

He nodded.
Nephele wasn't sure whether he grasped what she was saying.
Surely they would send someone competent to interview her, but so far, his facial expressions had indicated otherwise.

“The problem you have described – you called it _FizzBuzz_, I believe? – is based on modular arithmetic on natural numbers.”

He kept on nodding, although she clearly had lost him.

“It is an elementary result in automata theory that divisibility by any number _k_ for any base _b_ is a regular language.
Consequently, it can be recognized by regular expressions.
Surely it makes sense to stick with those, instead of reaching up higher in the Chomsky hierarchy.”

The interviewer felt transported back to one of his Computer Science classes, where a scruffy professor tried to tell them about touring machines or something.
He felt the rebelliousness of his youth coming back to him.

He retorted, feeling clever:

“That's all well and good, but who is going to check the regular expression against the input?
You need to code that somehow.”

But Nephele wouldn't let herself be outsmarted.

“You see, Kubernetes ingress controllers can perform regular expression matching _and substitution_.
We _just_ need to express divisibility by three, five, and fifteen as regular expressions.”

The interviewer hadn't ended things yet.
Nephele inferred that he intended to follow along.
Maybe a small part of his mind was curious to see how this would turn out.

“So, you are going to launch a Kubernetes cluster on your laptop?”, he asked, rhetorically.

Nephele was quick to correct him:

“It is pronounced Kubernetes.[^1]
But yes.
No need to fire up an AKS instance.”

Nephele was getting into flow, slightly intimidating her interviewer.
He didn't dare to interrupt _her_.
But it didn't matter.
She knew that she had to talk him through it.
She was running a tight ship, after all.

As `kind` was spinning up some local nodes, audibly straining her 13-inch laptop, she opened VS Code and started typing.

“Since we need _some_ kind of HTTP server, I'm going to spin up an `httpbin` image.”

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin
  labels:
    app: httpbin
spec:
  replicas: 1
  selector:
    matchLabels:
      app: httpbin
  template:
    metadata:
      labels:
        app: httpbin
    spec:
      containers:
      - name: httpbin
        image: kennethreitz/httpbin
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: httpbin
spec:
  selector:
    app: httpbin
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

“Isn't that ... cheating?”, he said, reluctantly.
“You promised to not write any code, but now you are pulling in someone else's.”

Nephele looked back at him sternly.
She thought he was trying to be clever again.

“Every ship needs an engine, don't you agree?”

He agreed, dejectedly.

“Fair enough” was all that he could say in return.

Her interviewer's futile attempt at regaining control of the situation did not curb Nephele's enthusiasm.

“Now for the boring part, I need a standard ingress controller.
I like to use Nginx.
Is it fine with you if I copy the configuration from their website?”

It was fine with him.
She could've asked for his firstborn child, and it would've been fine with him.

Attempting to exhibit a professional demeanour, he said, “Sure, go ahead.”

“And now for the exciting part!”

It was as if she had waited for this opportunity for her whole life.
Multiple threads of fate, converging in this interview room, with the interviewer being at its centre, through no choice of his own.

“My plan is to define four ingress rules for each combination of _divisible by three_ and _divisible by five_.
Since Nginx executes the rules by length of pattern, we need to make sure that the rule for `FizzBuzz` has the longest pattern.
Another slight complication is that the pattern must be understandable by `RE2`, which only implements a restricted subset of regular expressions.
We could use shorter expressions in Nginx directly, but alas, no luck.”

_I keep stumbling over this terrible regex library,_ she thought, but carried on regardless.

“Let's start with the simple case, when the number is not divisible by either three or five.”

The YAML flowed from her fingers, as if whitespace and colons were her mother tongue.

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: fizzbuzz-none
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /get?response=$1
    nginx.ingress.kubernetes.io/use-regex: "true"
spec:
  rules:
  - http:
      paths:
      - path: "/(.+)$"
        backend:
          serviceName: httpbin
          servicePort: 80
```

“We forward this request directly to `httpbin`, passing the number along as a query parameter.”

She was so confident, simultaneously impressing and frightening her interviewer.

“Can you deploy this, so we can try it out?”

Her interviewer leaned over her laptop as she typed in the magic `kubectl` incantations.

```
$ curl http://localhost/1 | jq .args.response
"1"
```

“It prints `1`, just as expected.”

Well, just as _she_ expected.
She didn't know what _he_ expected.

“Moving on, let's define the remaining ingress rules.
Divisibility by five is fairly easy to express as a regular expression.
You just have to check the last digit.”

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: fizzbuzz-5
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /get?response=buzz
    nginx.ingress.kubernetes.io/use-regex: "true"
spec:
  rules:
  - http:
      paths:
      - path: "/.*[05]$"
        backend:
          serviceName: httpbin
          servicePort: 80
```

“The order in which I define them doesn't matter, so I'll just write it below.
Remember, Nginx uses decreasing length to disambiguate multiple matches.”

He says nothing.
Will he remember anything from this interview?

“Divisibility by _three_ is a bit more complicated.
We first need to consider a state machine with exactly one state per residue modulo _k_.
The transition function is easily computed by multiplying the residue with the base 10, then adding the current digit, then computing the residue again.
This does not produce the minimal automaton in general, but it works.”

One of these days, she really has to write a script for that.
It comes up so frequently.

“Finally we can use the standard construction to transform the automaton into a regular expression.
Luckily, the result is guaranteed to not upset `RE2`.”

She chuckled.

“Give me a moment while I figure out the expression, will you?
I just quickly need to execute Brzozowski's method.”

He did.

“I'm going to get a coffee; do you also want one?” he asked politely.
But she didn't hear him.
She was already completely engrossed in what looked like solving an equation system, not having waited for his permission.

He left the room to get a coffee and some fresh air.
He took a sip and a breath while trying to understand the events that were currently unfolding in the interview room.
Determined to see this through, he returned.

As her interviewer came through the door, Nephele looked up.
“I'm done, we can deploy this now.”

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: fizzbuzz-15
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /get?response=fizzbuzz
    nginx.ingress.kubernetes.io/use-regex: "true"
spec:
  rules:
  - http:
      paths:
      - path: "/([0369]|[147][0369]*([147][0369]*[258][0369]*)*([147][0369]*[147]|[258])|[258][0369]*([258][0369]*[147][0369]*)*([258][0369]*[258]|[147]))*(0|[147][0369]*([147][0369]*[258][0369]*)*5|[258][0369]*([258][0369]*[147][0369]*)*[258][0369]*5)$"
        backend:
          serviceName: httpbin
          servicePort: 80
---
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: fizzbuzz-3
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /get?response=fizz
    nginx.ingress.kubernetes.io/use-regex: "true"
spec:
  rules:
  - http:
      paths:
      - path: "/([0369]|[147][0369]*[258]|(([258]|[147][0369]*[147])([0369]|[258][0369]*[147])*([147]|[258][0369]*[258])))+$"
        backend:
          serviceName: httpbin
          servicePort: 80
```

He saw an ocean of numbers.
An ocean in which he had lost all orientation.
He recognized the strings `fizz` and `fizzbuzz`, like lighthouses on the horizon.
It would be over soon.

Triumphantly, she typed in some more commands into her shell:

```
$ curl http://localhost/3 | jq .args.response
"fizz"
$ curl http://localhost/5 | jq .args.response
"buzz"
$ curl http://localhost/6 | jq .args.response
"fizz"
$ curl http://localhost/15 | jq .args.response
"fizzbuzz"
```

“See? It works beautifully.
And it scales very well.”

She snickered wryly.
The irony of a web-scale FizzBuzz cluster was not lost on her interviewer.

“I'll admit that the code doesn't handle errors very well right now.
Do you want me to keep going?
I could also use Helm templates to remove some of the duplication.”

His mind had switched to autopilot.

“No, that won't be necessary; I think I've seen enough.
Thanks for coming in today.
We'll be in touch.”

## References

* Boris Alexeev: [Minimal DFA for testing divisibility](https://doi.org/10.1016/j.jcss.2004.02.001)
* Brzozowski algebraic method: [reference by Michael Levet](https://michaellevet.wordpress.com/2015/04/22/automata-theory-brzozowski-algebraic-method/), [reference by jmad](https://cs.stackexchange.com/a/2392)
* [Full implementation](https://github.com/larsrh/fizzbuzz-k8s)
* [Discussion on HN](https://news.ycombinator.com/item?id=26428143)
* [Discussion on Lobsters](https://lobste.rs/s/ttcxph)

<hr>

Thanks to [Aphyr](https://aphyr.com/) for letting me “steal” the title of this post.
Check out his [amazing series](https://aphyr.com/tags/Interviews).
Furthermore, thanks to Marcus Bointon, Ross A. Baker, and Hillel Wayne for providing criticism and suggestions for improvements.
No interviewers were harmed in the process of writing.
Updated on 2021-03-13 to add references.

[^1]: /ky.ber.nɛ̌ː.tɛːs/

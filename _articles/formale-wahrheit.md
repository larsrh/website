---
title: "Formale Wahrheit"
date: 2015-12-03
lang: de
abstract: |
  Am Lehrstuhl für Logik und Verifikation der TUM wird Isabelle entwickelt, ein Programm mithilfe dessen man Theoreme beweisen kann.
  Interaktive Theorembeweiser sind relative neue Hilfsmittel in der Werkzeugsammlung von Mathematikern.
  Sind solche vom Computer verifizierten Argumentationsketten aber noch Beweise im mathematischen Sinn?
  (Dieser Artikel erschien ursprünglich in fatum Dezember 2015.)
---

Die meisten dem Autor bekannten Mathematiker würden bei der Frage, was denn nun genau einen Beweis ausmacht, ziemlich ins Schlingern geraten. Dabei sollte doch genau das eine der Kerndisziplinen der Mathematik sein – zumindest könnte man das denken, wenn man mal ein Lehrbuch oder eine Monografie aufschlägt: Definition, Satz, Beweis. Definition, Satz, Beweis. Ad nauseam. Die meisten haben sicherlich eine intuitive Vorstellung davon, wann genau jetzt ein Stück Prosa, gespickt mit Formeln, als gültiger Beweis anzusehen ist. Aber abseits der Teilbereiche der Mathematik, die sich explizit mit Logik beschäftigen, lässt das formale Verständnis oft zu wünschen übrig. In der Regel wird auch nur selten darüber nachgedacht.

Tatsächlich wurde die Mathematik für sehr lange Zeit auf eine Art und Weise betrieben, für die das Attribut „informell“ eher als Euphemismus einzuschätzen ist. Im zwanzigsten Jahrhundert folgte dann die Sinnkrise, in der sich einige namhafte Figuren – Frege, Gödel, Russell, um nur einige zu nennen – mit den formalen Grundlagen der Logik beschäftigt haben. Dabei stellte sich übrigens auch heraus, dass die sogenannte Mengenlehre, die am weitesten verbreitete Grundlage der Mathematik, inkonsistent ist. Die _Russelsche Antinomie_ konstruiert auf geschickte Art und Weise einen Widerspruch: In einer hypothetischen Bibliothek, in der es ein Katalogbuch gibt, welches alle Katalogbücher, die sich nicht selbst auflisten, auflistet, enthält dieses Katalogbuch eine Referenz auf sich selbst? Tut es das, dann tut es das nicht. Tut es das nicht, dann tut es das. Getreu des Prinzips „ex falso quodlibet“ (lateinisch: aus Falschem folgt Beliebiges) kollabiert mit einem solchen Widerspruch die gesamte Grundlage der Mathematik. Wir wollen uns aber mit diesem Problem (und seiner Lösung, gefunden ebenfalls von Russell) hier nicht beschäftigen.[^1] Stattdessen soll es hier um die zeitgenössische Mathematik gehen.

Zurück also zur Frage: Was ist ein Beweis? Ein Beweis ist eine Argumentationskette, die ausgehend von Axiomen mittels Schlussregeln eine Behauptung etabliert. Natürlich stellt sich dann gleich die Frage nach dem passenden Axiomensystem, aber dies sei vorerst zurückgestellt. Wir gehen im Folgenden davon aus, dass ein spezifisches Axiomensystem (per Konvention/Einigung) zugrunde liegt. Die Schlussregeln wiederum wollen auch wohldefiniert sein, um Trugschlüsse der Form „aus A folgt B; wir wissen B; folglich wissen wir A“ zu verhindern. Die wohl bekannteste Schlussregel ist der Modus ponens: Gegeben die Fakten „A impliziert B“ und „A“, können wir den Fakt „B“ schlussfolgern. Logiker würden dies als „A, A → B ⊢ B“ schreiben. Das Symbol „⊢“ trennt dabei die Hypothesen von den Folgerungen. Es gibt noch einige weitere Regeln für die anderen logischen Symbole, z. B. „A ⊢ A ∨ B“ (genannt „Disjunktionsintroduktion“).

Wenn man nun eine Reihe dieser Regeln anwendet und bei der ursprünglichen Behauptung angelangt ist, kann man von einem Beweis sprechen. Alles andere ist Wunschdenken. So schön wie diese fundamentalistische Weltsicht klingt, so unpraktisch ist sie auch. Der Vorteil, Argumentationen auf eine Reihe von leicht überprüfbaren – atomaren – Schritten zu reduzieren, ist zwar durchaus attraktiv, wird aber vom Nachteil des überbordenden Detailgrads wieder zunichte gemacht. Ziel eines Beweises ist ja nicht nur, die Richtigkeit einer Aussage ohne Zweifel zu demonstrieren, sondern auch, einem menschlichen Leser die Idee zu vermitteln.

Dem aufmerksamen Leser wird dieses Spannungsfeld bereits aufgefallen sein: Auf der einen Seite steht der Mensch, der sich für die Idee interessiert; auf der anderen jener, der sich von der Korrektheit überzeugen will. Der eine bevorzugt Prosa, der andere Rigorosität. Wie lassen sich beide glücklich machen?

Dies ist der Punkt, wo Maschinen ins Spiel kommen. Maschinen sind ideal dafür, um dem Menschen lästige Arbeit abzunehmen. Leider stellte sich im letzten Jahrhundert heraus, dass für beliebige Aussagen nicht automatisch ermittelt werden kann, ob es einen Beweis gibt (witzigerweise lässt sich das auch beweisen). Allerdings kann man problemlos die Axiome und Schlussregeln einem Programm beibringen, welches fortan die kleinschrittigen Argumentationen nachvollziehen kann. Dadurch hätte man das erste Problem, das der Rigorosität, gelöst: Ein menschlicher Gutachter braucht sich bloß von der Korrektheit des (hoffentlich) kurzen Programmtextes zu überzeugen und kann fortan diesem Programm Beweise füttern.

Das zweite Problem ist jedoch deutlich gravierender. Einer Mathematikerin, die über Milleniumsprobleme nachdenkt, wird kaum „Disjunktionsintroduktion“ in den Sinn kommen. Gefragt sind stattdessen abstrakte Konzepte.

Die Keplersche Vermutung sagt aus, dass die effizienteste (d. h. raumfüllendste) Art und Weise, Kugeln zu stapeln, diejenige ist, die man auf jedem Obstmarkt antreffen kann. Der zugehörige Beweis ist jedoch sehr trickreich, gibt es doch unendlich viele potenzielle Packungsmöglichkeiten. Der Informatiker Thomas Hales ging den Beweis durch Unterscheidung tausender und abertausender Fälle an. Die einzelnen Fälle wurden von einem speziellen Computerprogramm durchgerechnet. Nach einer gewissen Zeit gelang dieses Unterfangen. Jedoch stand die Frage im Raum, ob das Programm auch wirklich richtig gerechnet habe. Ein mehrköpfiges Gremium begutachtete die schriftlichen Ausarbeitungen und kam zum Schluss, dass der Beweis mit hoher Sicherheit korrekt ist. Hohe Sicherheit, nicht absolute Sicherheit (im Rahmen dessen, was im epistemologischen Sinne überhaupt möglich ist).

Hales ließ nicht locker. Er nutzte stattdessen ein primitiveres Computerprogramm; ein solches, das wie weiter oben beschrieben, nur atomare Schritte nachvollziehen kann. Dann schrieb er weitere Routinen, die eine geeignete Beweiskette erzeugten. Der Beweis ist nun also dreischichtig: Zuoberst die Idee des Mathematikers, dann Rechenkraft, um diese zu elaborieren, und schließlich ein Werkzeug, das alles prüft.

Von solcherlei Werkzeugen gibt es eine Vielzahl. Man nennt sie – je nach Modell – „automatische“ oder „interaktive“ Beweisassistenten, vergleichbar einem menschlichen Assistenten. Man kann diese als primitive Gutachter benutzen. Die meisten haben jedoch Routinen eingebaut, die logische Schlüsse wie „x + y = x ⊢ y = 0“ in primitive Schritte übersetzen. Russell hatte das in seiner _Principia Mathematica_ noch von Hand versucht, was die Berechnung von „1 + 1“ auf mehrere Seiten ausufern ließ. Besonders fortschrittliche Assistenten haben darüber hinaus auch eine von mathematischen Texten inspirierte Syntax. Man kann damit Beweise schreiben, die sowohl für menschliche als auch mechanische Begutachtung geeignet sind. Weltweit forschen viele Informatiker, Logiker und Mathematiker daran, wie man die Automatismen und Routinen noch mächtiger macht, so dass der menschliche Autor immer weniger über technische Details nachdenken muss, sondern sich auf das „big picture“ konzentrieren kann.

Wie so etwas aussehen kann, lässt sich leicht anhand eines solchen interaktiven Beweisassistenten demonstrieren. In den 80er-Jahren wurde von Larry Paulson die Toolsammlung _Isabelle_ geschaffen, die seither von einer kleinen Gemeinschaft weiterentwickelt wird und weltweit Anwendung in vielen Bereichen findet. Neben der TU München wird in Cambridge und anderen Einrichtungen an der Toolsammlung gearbeitet. Isabelle selbst folgt der sogenannten _LCF_-Tradition (Logic for Computable Functions): ein kleiner, nachvollziehbarer Kern, gegenüber dem Beweisschritte gerechtfertigt werden müssen, sowie darauf aufbauend eine Vielzahl von manuellen, semiautomatischen und automatischen Routinen. Darüber hinaus ist Isabelle in Hinblick auf Axiomensysteme weitestgehend agnostisch. Neben der hauptsächlich genutzten „Logik höherer Stufe“, die sich stark an der Mainstream-Mathematik orientiert, aber auch Anleihen aus Programmiersprachen der Informatik nimmt, gibt es noch einige andere, die sie ergänzen oder gänzlich ersetzen können.

Abgesehen von diesen technischen Details fällt bei Isabelle direkt ins Auge, dass in der Sprache _Isabelle/Isar_ verfasste Beweise auch für einen menschlichen Leser nachvollziehbar sind. Als Beispiel soll hier der Satz über die Summe aller natürlichen Zahlen – Informatiker zählen ab null – bis _n_ dienen. Der Überlieferung nach ist dem jungen Gauß diese Formel spontan in den Sinn gekommen, als sein Lehrer ihn beschäftigen wollte. Intuitiv ist klar, warum 0 + 1 + … + (_n_ − 1) + _n_ insgesamt _n_ × (_n_ + 1) ÷ 2 ergibt, aber wie lässt sich das beweisen? Die gängige Erklärung ist, dass man Zahlenpaare zur Summe _n_ + 1 bildet, ihrer _n_ ÷ 2 an der Zahl. Anders gesprochen: 0 + 1 + … + (_n_ − 1) + _n_ = 0 + (1 + _n_) + (2 + _n_ − 1) + …

Mathematisch Uneingeweihte lassen sich von so einem „Beweis“ durchaus überzeugen. Ein Mathematiker hingegen würde einen stichhaltigen _Beweis per Induktion_ liefern. In _Isabelle_ geschrieben sähe dieser so aus:

```
lemma gauss: ∑{0..n} = n*(n+1)div2

proof (induction n)
  case 0
  show ?case
    by eval
next
  case (Suc m)
  have ∑{0..m+1} = ∑{0..m}+m+1
    by simp
  also have … = m*(m+1)div2+m+1
    using Suc.IH by simp
  also have … = m*(m+1)div2+2*(m+1)div2
    by simp
  also have … = (m+1)*(m+2)div2
    by simp
  finally show ?case
    by simp
qed
```

Zunächst zur Notation: Das Symbol „∑“ steht für die Summierung einer Menge. Auf der linken Seite des Gleichheitszeichens steht also die Summe der Menge 0, 1, 2, … bis _n_. Statt dem üblichen Divisionszeichen schreibt man für natürliche Zahlen „div“, um klarzustellen, dass keine gebrochenen Zahlen herauskommen können. „?case“ steht für die derzeit zu beweisende (Unter-)behauptung. Auf „by“ folgt der Aufruf einer Routine, die einen Teilbeweis selbstständig führt.

Das Beweisprinzip der Induktion ist anhand des obigen Beispiels nun schnell erläutert: Man zeige den Basisfall (für _n_ = 0) und den Induktionsfall (angenommen, _n_ gilt, dann gilt auch _n_ + 1); gemeinsam gilt dann die Aussage für beliebige _n_. Diese Struktur ist oben klar ersichtlich. Man sieht, wie eine Behauptung in kleinere Schritte unterteilt wird, die man separat verstehen kann. Der Basisfall lässt sich einfach durch Einsetzen zeigen (0 = 0 × 1 ÷ 2); dies übernimmt „eval“. Es ist in der Lage, einfache numerische Ausdrücke vollständig auszuwerten. Im etwas schwierigeren Induktionsfall hingegen muss zunächst die Summe aufgeteilt, anschließend die bekannte Gleichung ersetzt und schließlich vereinfacht werden. Die zugehörige Routine „simp“ kann jeden dieser Schritte überprüfen.[^2] Am Ende steht „qed“, die Anweisung, dass die Maschine prüfen soll, ob wirklich alle Teilbeweise erfolgreich abgeschlossen worden sind. Meckert der Assistent nicht, kann die Behauptung nun als bewiesener Satz gelten und man kann sich in der Gewissheit zurücklehnen, keine Fehler – zumindest keine unabsichtlichen – gemacht zu haben.

Es zeigt sich, dass interaktive Beweise eine Art Dialog mit der Maschine darstellen. Der menschliche Benutzer diktiert die Struktur, die Maschine füllt die Details. Dieses System funktioniert für viele mathematischen Disziplinen ausgesprochen gut. Nichtsdestotrotz gibt es noch viel zu forschen, noch viel zu automatisieren, denn manchmal schlägt die Automatisierung fehl. Man kann sich das dann so vorstellen, als ob man einem fünfjährigen Kind Raketenphysik erklären müsste: eine scheinbar endlose Folge an „Warums“ beantworten.

Doch es gibt noch einen anderen Punkt, an dem man diese Art der Beweise kritisieren kann, nämlich die Wahl des logischen Systems. Freilich betrifft diese Kritik auch menschliche Beweise. Allerdings tritt es bei maschinellen Beweisen stärker hervor: Der Computer sagt zwar „ja“ oder „nein“ zu einem Beweis, aber die Interpretation ebendieses Resultats ist abhängig von der Bedeutung der Axiome und der genutzten Definitionen. Um beim obigen Beispiel zu bleiben: Warum genau ist das Induktionsprinzip gültig? Wie ist es zu rechtfertigen? Tatsächlich handelt es sich dabei um ein Axiom. Man nimmt die Existenz einer (unbestimmten) unendlichen Menge, einer Null und einer Nachfolgerfunktion (die jeder Zahl ihren Nachfolger zuordnet) an und schneidert sich dann daraus die natürlichen Zahlen. Falls ein Mathematiker diese Art der Unendlichkeit ablehnt (oder das Konzept der Unendlichkeit als solches), dann wird man sich nicht über die Gültigkeit des Beweises einig werden.

Ein historisches Beispiel ist der „ontologische Gottesbeweis“ nach Kurt Gödel, der mittlerweile auch in Isabelle nachvollzogen worden ist. Basierend auf einer sogenannten Modallogik, in welcher man _notwendige_ und _mögliche_ Aussagen treffen kann, leitet man die Existenz Gottes her. Um genauer zu sein, zeigt man den Satz „notwendigerweise existiert ein Individuum mit der Eigenschaft ‚Gott-artig‘“. Die Details würden an dieser Stelle zu weit führen, aber klar ist, dass allein der Versuch, „Gott-artigkeit“ formal so zu fassen, dass die katholische Kirche einverstanden ist, zum Scheitern verurteilt sein muss. Tatsächlich war Gödels Intention, zu demonstrieren, dass man mit den geeigneten Definitionen und Annahmen alle Behauptungen formal beweisen kann.

Bei einem sind sich allerdings viele Wissenschaftler einig: Wahrheit ist nur das, was überprüft werden kann. Mechanisch. Denn der Mensch ist zwar außerordentlich gut darin, Muster zu sehen, Konzepte zu verbinden, Ideen zu abstrahieren – aber sehr schlecht, das alles korrekt hinzuschreiben. Ein Computer, der einem dabei auf die Finger schaut, macht vieles schwerer, aber auch einiges leichter. Die Resultate genau zu untersuchen wird allerdings auf absehbarer Zeit weiterhin eine menschliche Aufgabe bleiben.

[^1]: Für eine pointierte Darstellung der jüngeren Geschichte der mathematischen Logik empfiehlt der Autor das Buch _Logicomix_.
[^2]: Tatsächlich könnte „simp“ auch den gesamten Beweis automatisch führen.

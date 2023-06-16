---
title: Wenn Software-Testing nicht ausreicht
date: 2023-05-24
lang: de
abstract: |
  Das Schreiben von Tests ist heutzutage gängige Praxis.
  Wie würde man sonst sicherstellen, dass der Code das tut, was man erwartet?
  Manche Software ist jedoch geschäftskritisch und das bloße Testen einiger Beispiele reicht nicht aus.
  (Dieser Artikel wurde ursprünglich im t3n-Magazin, Ausgabe 71, veröffentlicht.)
---

Der übliche Arbeitsablauf in moderner Software-Entwicklung beinhaltet nicht nur das Schreiben des Codes. Von den Entwickler:innen wird vielmehr erwartet, dass sie sich auch mit den Anforderungen, den funktionalen Tests, der Dokumentation und stellenweise auch mit dem Betrieb der fertigen Software befassen. Generell ist das keine schlechte Idee, denn wenn diese vielfältigen Kompetenzen in einem schlagkräftigen Team gebündelt sind, dann können diese auch neue Funktionen komplett entwickeln und betreiben, was die Entwicklungsgeschwindigkeit deutlich erhöht.

Solche Modelle, bei denen es schnelle Zyklen von Anforderung, Programmierung und Test gibt, werden verschiedentlich als „Goldstandard“ der Entwicklung gehandelt. Die sogenannte „testgetriebene Entwicklung“ („test-driven development“ oder „TDD“) geht sogar weiter und fordert, dass die Tests einer Funktionalität vor der eigentlichen Programmierung stattfinden. Ziel ist es, besser funktionierende Software zu entwickeln. Denn Software-Bugs sind nicht nur ärgerlich, sondern können auch katastrophale Schäden hervorrufen.

## Test-getrieben zu besserer Software?

In TDD argumentiert man nun, dass das Schreiben der Tests vor dem Schreiben des Codes dazu zwingt, dass man sich mit den Anforderungen und dem Design des Codes auseinandersetzt. Dadurch soll der Code eine logischere Struktur bekommen und gleichzeitig auch vertrauenswürdiger werden, denn per Definition kann kein Code ohne Test existieren.

Allerdings hat die Sache einen Haken. Egal ob man sich nun an TDD hält oder die Tests irgendwann schreibt, sind die allermeisten Tests auf konkrete Beispieleingaben ausgelegt. Man werfe der Reihe nach die Zahlen „0“, „1“, „42“ und „-8“ in die Routine und schaue, was passiert. Was aber, wenn sich der Fehler genau bei der Eingabe „-1“ versteckt hat? Oder wenn die Eingaben eine deutlich komplexere Struktur aufweisen?

Dazu ein Praxisbeispiel. In der Java-Standardbibliothek findet sich eine Sortierfunktion, die auf dem Algorithmus „TimSort“ basiert. Fast alle Java-Software, auch unter Android, nutzt diese Routine, um Listen zu sortieren. Man sollte also meinen, dass Fehler hier schon längst aufgefallen wären. Dennoch [fand eine Forschungsgruppe einen Bug,](http://www.envisage-project.eu/timsort-specification-and-verification/) der eine bestimmte Annahme im Code verletzt und damit einen Crash provoziert.

Nun ist „TimSort“ ein eher komplizierter Algorithmus. Doch auch in einfacheren Algorithmen, die in jedem Informatikstudium vorkommen, können sich leicht Fehler einschleichen. Joshua Bloch, früherer Chefarchitekt für Java bei Google, [schrieb schon 2006,](https://ai.googleblog.com/2006/06/extra-extra-read-all-about-it-nearly.html) dass die einfache Zeile

```java
int mid = (low + high) / 2
```

fehlerhaft ist, und dass, obwohl sie für die „binäre Suche“ gebraucht wird, die in jedem Informatik-Studium vorkommt.

Haben Sie den Fehler erkannt?

Was passiert, wenn die Summe aus den beiden Variablen „low“ und „high“ zusammen den Höchstwert für Integer überschreitet? Dann gibt es einen Overflow und plötzlich ist die Variable „mid“ negativ, was bei darauffolgenden Arrayzugriffen wieder zu einem Crash führt. In C und C++ hingegen ist das Verhalten komplett unspezifiziert; das heißt, das Programm könnte einfach weiterlaufen und falsche Ergebnisse berechnen, ohne, dass man von dem Fehler etwas mitbekommt.

Um so einen Fehler durch bloßes Testing zu finden, muss man der Routine einen Array füttern, der ca. eine Milliarde Elemente hat. Aber welche:r Entwickler:in denkt schon an solche Grenzfälle? Leider kann Testing immer nur die Anwesenheit von Bugs beweisen, aber nie deren Abwesenheit.

## Beyond testing

Man mag sich jetzt auf den Standpunkt stellen, dass in einem durchschnittlichen Softwareprojekt nur selten spannende Sortier- oder Suchverfahren implementiert werden müssen. Stattdessen sieht sich das Entwicklungsteam eher mit weniger glamourösen Aufgaben konfrontiert, wie zum Beispiel Daten von einer Ecke in die andere zu schaufeln. Mit anderen Worten: Wo kann es schon unüberschaubare Fehler in der fachlichen Entwicklung geben?

Tatsächlich wird die Komplexität selbst von scheinbar „langweiliger“ Software oft drastisch unterschätzt. Gerade in verteilten oder nebenläufigen Systemen ist der Zustandsraum aller beteiligten Komponenten derart hoch, dass einfaches Testing zum Scheitern verurteilt ist. Sind Sie sich beispielsweise sicher, dass Ihre Software für jede Anfrage in endlicher Zeit eine Antwort findet? Im populären Bildverarbeitungswerkzeug „ImageMagick“ hat eine unerwartete Rundung von Gleitkommazahlen dafür gesorgt, [dass bestimmte Routinen hingen.](https://legacy.imagemagick.org/discourse-server/viewtopic.php?t=31506) In modernen, Event-getriebenen Architekturen kann eine „außerordentliche“ Nachrichtenreihenfolge [schon mal größeren Schaden anrichten.](https://doi.org/10.1145/3503222.3507753)

Gerade deswegen investieren nicht nur Forschungseinrichtungen, sondern auch die Big-Tech-Konzerne substanziellen Aufwand in die sogenannten „formalen Methoden“. Darunter versteht man eine Reihe von – teilweise sehr unterschiedlichen – Werkzeugen und Ansätze, mit denen man vereinfacht gesagt die Implementierung einer Software auf Fehler untersuchen kann, ohne auf konkrete oder vordefinierte Eingaben und Beispiele angewiesen zu sein. Der Zustandsraum von Programmen kann mit diesen Werkzeugen nahezu vollständig abgedeckt werden.

Diese Werkzeuge unterscheiden sich unter anderem durch den Grad ihrer Automatisierung: Während sogenannte „ATPs“ (kurz für „automated theorem provers“) vollautomatisch die Korrektheit eines Algorithmus zeigen, legt man in „ITPs“ (kurz für „interactive theorem provers“) die Schritte selbst fest. Bei weiter Auslegung des Begriffs der formalen Methoden kann man auch einen Typchecker im Compiler den ATPs zurechnen. Denn dieser erkennt – ohne das Programm ausführen zu müssen – bestimmte Fehlerklassen zuverlässig. Ähnliches gilt für Linting-Werkzeuge.

Ein weiteres Merkmal ist, ob ein Werkzeug direkt auf Code wie C oder Java arbeiten kann oder eine eigene, meist abstraktere Sprache, nutzt.

Einen interessanten Hybridansatz stellen Programmiersprachen mit sogenannten „Refinement Types“ dar. Zwei bekannte Vertreterinnen dieser Gattung sind „Liquid Haskell“, welches auf Haskell-Syntax basiert, und F\*, eine enge Verwandte von OCaml und F#. In letzterer kann man beispielsweise einen Typ deklarieren, der ausschließlich die geraden natürlichen Zahlen erfasst:

```
let nat = x : int {x \>= 0}
let even = x : nat {x % 2 = 0}
```

Im Handumdrehen ist nun eine Funktion geschrieben, die zwei gerade Zahlen aufaddiert, wobei beweisbar eine gerade Zahl entsteht:

```
let add_even (x : even) (y : even) : even = x + y
```

Der Grundgedanke dabei: Statt lediglich mit „plumpen“ Basistypen zu arbeiten, lassen sich über die „Refinements“ in geschweiften Klammern genauere Einschränkungen definieren, ähnlich zu „assert“ in Sprachen wie C und Java. Allerdings werden diese Refinements nicht zur Laufzeit, sondern zur Compilezeit überprüft. Wäre im obigen Beispiel einer der beiden Parameter mit „nat“ statt „even“ annotiert, würde der Typchecker dies monieren und das Programm ablehnen.

Der Vorteil liegt auf der Hand: Mit einer solchen Programmierumgebung ist es fast schon trivial, Invarianten und andere Bedingungen für komplexe Datentypen zu formulieren, so dass ungültige Zustände zur Laufzeit gar nicht erst entstehen können. Kann man nicht beweisen, dass eine Invariante erfüllt ist, beispielsweise weil Daten erst zur Laufzeit bereitstehen, zwingt einen das System dazu, eine vollständige Validierung der Eingabe zu programmieren. Was übrigens generell anzuraten ist, auch wenn man keine formalen Methoden benutzt.

Einen lehrreichen Vergleich von verschiedenen Tools, mit denen sich solcherlei Programmanalysen durchführen lassen, hat Hillel Wayne unter dem Motto [„Let’s Prove Leftpad“](https://www.hillelwayne.com/post/lpl/) zusammengestellt. „Leftpad“ ist eine einfache Funktion, die drei Parameter nimmt: ein Füllzeichen, eine Ziellänge und einen String. Ist der String kürzer als die Ziellänge, dann wird er von links mit hinreichend vielen Kopien des Füllzeichens verlängert. Beispiel:

```
>> leftpad('!', 5, "foo")
!!foo
```

Wayne hat auf Twitter zu Beiträgen aufgerufen, mit verschiedenen formalen Werkzeugen die Korrektheit dieser Funktion zu untersuchen. Er erhielt insgesamt 22 Lösungsvorschläge. Für Java wurden insgesamt 17 Zeilen benötigt:

```java
//@ requires n >= 0;
//@ requires s != null;
//@ ensures \result.length == Math.max(n, s.length);
//@ ensures \forall int i; i >= 0 && i < Math.max(n - s.length, 0); \result[i] == c;
//@ ensures \forall int i; i >= 0 && i < s.length; \result[Math.max(n - s.length, 0) + i] == s[i];
static char[] leftPad(char c, int n, char[] s) {
    // Implementierung ...
}
```

Wie man sieht, handelt es sich um gewöhnlichen Java-Code, der um spezielle Kommentare erweitert worden ist. Diese Kommentare enthalten Vor- und Nachbedingungen im Format der [„Java Modeling Language“](https://www.openjml.org/) (kurz „JML“) und werden vom Java-Compiler ignoriert. Ein der JML-Suite beigelegter Checker interpretiert jedoch die Kommentare und versucht zu beweisen, dass die spezifizierten Bedingungen konsistent mit der Implementierung sind.

Im obigen Beispiel lassen sich diese Kommentare wie folgt interpretieren:

* Die Ziellänge des Strings („n“) darf nicht negativ sein.
* Der String darf nicht „null“ sein.
* Der Rückgabewert der Funktion („\result“) ist entweder ein String der Ziellänge, oder, falls der eingegebene String bereits länger war, ebenso lang wie dieser.
* Die verbleibenden beiden Nachbedingungen spezifizieren den Inhalt des Rückgabewerts.

Im Vergleich dazu kommt der Lösungsvorschlag in F\* mit nur 14 Zeilen aus. Die Implementierung der Funktion „Leftpad“ ist dabei von der Spezifikation getrennt. Letztere sieht (gekürzt) wie folgt aus:

```
let leftpad_correct (c : char) (n : nat) (s : seq char) =
  assert (length (leftpad c n s) = max n (length s))
```

Im Gegensatz zur Java-Variante sind die Vorbedingungen unnötig, da in F\* Referenzen niemals „null“ sein können und man dank eingebautem Typ der natürlichen Zahlen auch Negativwerte direkt ausschließt.

Während beide hier vorgestellten Werkzeuge mit dem Beispiel „Leftpad“ vollautomatisch ablaufen, lehrt uns die theoretische Informatik mit dem Satz von Rice, dass man stets Programme konstruieren kann, für die diese Automatik eben nicht funktioniert. Auch das bloße Beweisen der Terminierung einer Funktion ist nicht entscheidbar.

Es gibt aber einen Trick: Man kann auch den automatischen Tools ein paar Hinweise soufflieren, wenn sie selbst nicht mehr weiterwissen. Schleifen sind dabei ein notorisches Problem, über welches viele Werkzeuge stolpern. Im Falle der Java-Implementierung von „Leftpad“ gibt es eine Schleife, die den String von links auffüllt:

```java
//@ maintaining i >= 0 && i <= pad;
//@ maintaining \forall int j; j >= 0 && j < i; v[j] == c;
for(; i<pad; i++) v[i] = c;
```

Die zwei Kommentare spezifizieren für JML die sogenannte „Schleifeninvariante“, eine Art Hilfsaussage, die zwar noch nicht die finale Korrektheit zeigt, aber zumindest für den gesamten Lebenszyklus der Schleife gilt. Konkret heißt es hier, dass die Zählvariable „i“ den spezifizierten Bereich zwischen „0“ und „pad“ nicht verlässt; sowie dass alle Positionen im Array „v“ zwischen „0“ und „i“ auf das Zeichen „c“ gesetzt sind.

Eine der Erkenntnisse aus dem von Wayne durchgeführten Vergleich ist, dass es eine Fülle von verschiedenen Werkzeugen gibt, die für eine Fülle von Programmiersprachen zur Verfügung stehen. Oftmals sind diese aber wenig bekannt, teilweise aber auch umständlich zu bedienen, was zwei mögliche Ursachen für ihre geringe Verbreitung in Softwareprojekten sind.

## Was soll die Software tun?

Wenn Softwareprojekte scheitern, dann liegt das nicht immer daran, dass sich zu viele Bugs eingeschlichen haben. Manchmal ist schlichtweg nicht klar, was die Software überhaupt tun soll. Das „Leftpad“-Beispiel demonstriert eindrucksvoll, wie schwierig es ist, sich überhaupt darüber klar zur werden, wie sich eine Funktion in allen Regel- und Grenzfällen verhalten soll. Leider sind gerade in agilen Entwicklungsverfahren [Spezifikationen ein rotes Tuch,](https://www.hillelwayne.com/post/augmenting-agile/) erscheinen sie doch wie ein altbackenes Monstrum, das schlecht auf Änderung der äußeren Umstände reagieren kann.

Oft stimmt das auch. Aber manchmal zahlt es sich eben doch aus, eine ausführliche Spezifikation zu formulieren, um Designfehler frühzeitig zu erkennen und zu beheben. Auch hier bieten die formalen Methoden einen Strauß an Möglichkeiten an.

Die einfachste und am schnellsten zu erklärende formale Spezifikationstaktik sind (boolesche) Entscheidungstabellen. Man kann sie in hochgradig konfigurierbaren Systemen einsetzen. Dazu legt man eine Tabelle mit einer Spalte pro Konfigurationsoption und einer Spalte pro mögliche Ausgabe an. Beispielsweise könnte man bei einer Registrierkasse sämtliche Kombinationen von Coupons mit den resultierenden fixen oder prozentualen Rabatten auflisten. Wenn nötig, nimmt man noch den Mehrwertsteuersatz oder Sonderaktionen als Spalte mit auf. Dieses Beispiel ist nicht aus der Luft gegriffen: Die meisten Kassensysteme sind heutzutage hochkomplex. Gerüchtehalber konnten noch vor 15 Jahren die Kassen eines Discounters durch einen Betrag von genau 0 € (Einkauf abzüglich Pfands) lahmgelegt werden. (Hätten Sie an einen Testfall für genau dieses Szenario gedacht?)

Ähnlich einfach zu benutzen sind Zustandsautomaten. Das klassische Beispiel hierfür ist der Getränkeautomat, der nach Auswahl eines Produkts die Münzen erwartet und anschließend in den „Ausgabe“-Modus wechselt. Traditionell kann man solche Automaten als Kreise und Pfeile aufmalen, wobei die Kreise für die Zustände und die Pfeile für Ein- und/oder Ausgaben stehen. Der Formalismus zwingt dann zur Vollständigkeit; beispielsweise kann man so feststellen, ob man sich Gedanken über den Fall gemacht hat, wenn jemand erst Münzen einwirft und dann ein Produkt auswählt. Oder was passiert, wenn jemand munter weiter Münzen füttert, obwohl das Getränk gerade ausgegeben wird.

Während Entscheidungstabellen oder Zustandsautomaten unkompliziert per Hand oder in der Tabellenkalkulation des Vertrauens aufgeschrieben werden können, haben sie einen gewichtigen Nachteil: Mit ihnen kann man nur endlich viele Zustände abdecken.

An dieser Stelle setzen dann andere Werkzeuge an, mit denen sich formale Spezifikationen mit mathematischer Notation definieren lassen. Ein Vertreter dieser Gattung ist „Isabelle“, welches auf der Mengenlehre basiert und zahlreiche Bibliotheken für alle erdenklichen mathematischen Teilgebiete, aber auch für Algorithmen mitbringt. Um auf das Beispiel „Leftpad“ von weiter oben zurückzukommen: Mit Isabelle lässt sich einerseits die „Leftpad“-Funktion vollständig spezifizieren, andererseits auch mathematisch beweisen, dass die Spezifikation eindeutig ist. Das heißt, es gibt keine zwei voneinander unterscheidbaren Implementierungen, die beide die Spezifikation von „Leftpad“ erfüllen. Auch das ist keine triviale Eigenschaft: sowohl unter- als auch überspezifizierte Software kann zu realen Problemen führen.

Isabelle ist in bestimmten Industriebereichen verbreitet, beispielsweise für Hardware-nahe Programmierung im „L4“-Microkernel. In einem australischen Konsortium wurde dazu die „seL4“-Variante aus der Taufe gehoben und funktional korrekt bewiesen: Nicht nur wurde gezeigt, dass der in C implementierte Kernel beispielsweise keinerlei Speicherüberläufe aufweist, sondern auch vertrauenswürdige Infrastruktur für Anwendungsprozesse geschaffen, die auf diesem Kernel laufen. In einem anderen Projekt wird es für die Verifikation von Finanzsoftware eingesetzt, um zu verhindern, dass negative Kontostände entstehen können oder dass Überweisungen möglicherweise gutgeschrieben, aber der Gegenseite nicht belastet werden.

## Fazit

Wenn die Social-Media-App beim Scrollen durch die Timeline abstürzt, dann kostetet das zwar mögliche Werbeeinnahmen, ist aber gesamtgesellschaftlich verschmerzbar. Geht aber im großen Stil Geld verloren, weil die Berechnung der Kontostände in Banken schiefgelaufen ist – [so geschehen bei der DKB im November 2022](https://www.handelsblatt.com/finanzen/banken-versicherungen/banken/deutsche-kreditbank-dkb-raeumt-fehlerhafte-buchungen-bei-girokonten-ein/28788388.html) – dann können dadurch katastrophale Folgen entstehen. Testen von Software erfordert einen moderaten Aufwand und bietet signifikante Verbesserungen der Qualität. Doch um das letzte Quäntchen herauszuholen, scheitern moderne Testverfahren, und man muss sich darüber Gedanken machen, formale Methoden der Spezifikation und Verifikation hinzuziehen. Jedoch muss man nicht gleich eine Schar von kostspieligen Spezialist:innen anheuern. Es gibt auch einfache Techniken, wie beispielsweise Entscheidungstabellen oder Zustandsautomaten, die einfach anwendbar sind und daher in keinem Software-Werkzeugkasten fehlen sollten. Nur wenn selbst diese nicht mehr ausreichen, ist es Zeit, die schweren Geschütze der mathematischen Modellierung aufzufahren. Dass das nicht nur ein Kostenfaktor ist, sondern auch handfeste Vorteile bringt, beweisen unter anderem [Amazon](https://www.amazon.science/blog/how-to-integrate-formal-proofs-into-software-development), [Google](https://www.phoronix.com/news/Google-KataOS), [Intel](https://www.cl.cam.ac.uk/~jrh13/slides/oregonsummerschool-26jul12/slides.pdf) und Apple, die eigene Teams für formale Methoden aufgebaut haben und diese routinemäßig für besonders kritische Anwendungen einsetzen.

_Dieser Artikel wurde auch auf [LinkedIn veröffentlicht](https://www.linkedin.com/pulse/wenn-software-testing-nicht-ausreicht-dr-lars-hupel/)._

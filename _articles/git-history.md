---
title: "Geschichtsrevisionismus: Nachträgliches Ändern einer Projektgeschichte mit Git"
date: 2011-09-12
abstract: |
  Was unter Historikern verpönt ist, ist mit Git ganz einfach:
  Die Geschichte eines Projekts im Nachhinein ändern.
  Welche Möglichkeiten es da gibt, soll in diesem Artikel kurz vorgestellt werden.
  (Dieser Artikel erschien ursprünglich im KaffeeKlatsch 09/2011.)
lang: de
---

Jedes _Git-Repository_ enthält eine vollständige Kopie der gesamten Projektgeschichte.
Das bedeutet auch, dass man selbst Herr über die Änderungen ist und diese auch beliebig bearbeiten darf, was konzeptuell mit zentralisierten Systemen wie _Subversion_ nicht möglich ist.[^footnote-svn]

Die  Frage  ist  nun,  warum  man  überhaupt  die  vergangenen _Commits_   nachträglich   manipulieren   sollte.
Dies  ist  nur  in  wenigen  Fällen  sinnvoll;  auf  keinen  Fall aber,  wenn  die  Änderungen  bereits  in  ein  öffentliches (oder  zumindest  von  mehreren  anderen  Personen  genutztes) _Repository_ publiziert worden sind.
Ist dies bereits geschehen, kommt es beim Verändern der Geschichte zu Komplikationen – doch dazu später mehr.

Wir  betrachten  nun  einen  gängigen  _Git-Workflow._
Alice hat einige Tage an einem neuen Feature gearbeitet, womit  sie  nun  fertig  ist.
Der  Philosophie _commit  early, commit often_ folgend, hat sie alle paar Stunden eine neue Revision erzeugt. Natürlich hat sie ihr eigenes Setup und möchte  nun  vor  dem  Pushen  in  einer  frischen  Umgebung  ihre  Änderungen  testen,  damit  sie  auch  ja  nichts vergessen  hat.  Also  cloned  sie  ihr  Repository  und  führt dort den _Build_ aus.

Stellen wir uns nun vor, dass dieser fehlschlägt. Was war das  Problem?  Alice  arbeitet  normalerweise  auf  einem Dateisystem,  welches  keine _Unix_-Rechte  unterstützt.[^footnote-unix]
Ungünstigerweise  hat  sie  am  Anfang  ihrer  Arbeit  ein Shellskript angelegt und vergessen Git mittels `git update-index --chmod=+x build.sh` Rechte zur Ausführung zu geben.  Git  hat  daher  die  Datei  nur  mit  den  Rechten `644` angelegt,  was  nun  unter  der  frischen  Unix-Umgebung dazu führte, dass das Skript nicht lief.

Es gibt nun zwei Möglichkeiten, mit diesem Problem umzugehen:

1. Einen neuen Commit anlegen, der die Rechte ändert.
2. Den ursprünglichen Commit so ändern, dass die Rechte korrekt sind.

Die erste Lösung disqualifiziert sich, sobald jemand `git bisect` verwenden möchte. Dabei handelt es sich um ein praktisches Kommando, um Regressionen aufzuspüren. Man  gibt  Git  dafür  zwei  Revisionen:  eine  „gute“  und eine „schlechte“. Git checkt nun die Revision in der Mitte aus. Diese kann man dann testen, um anschließend mittels `git bisect good` oder `git bisect bad` Git kundzutun, ob die  aktuelle  Revision  korrekt  läuft.
Git  fährt  dann  mit der  binären  Suche  fort  und  präsentiert  einem  so  lange Revisionen, bis zuverlässig eine gefunden wurde, in der die Regression eingeführt wurde. Der große Vorteil an dieser Prozedur ist, dass sie automatisiert werden kann – Git führt auf Wunsch nach jedem _Checkout_ ein Skript aus, welches beispielsweise den Build und die Tests ausführen kann, um dann selbstständig zu entscheiden, ob diese Revision gut war.

Man  stelle  sich  jetzt  vor,  dass  sich  eine  Revision,  in der der Build fehlschlägt, im Repository befindet. Unter Umständen  wird `bisect`  diese  Bob  präsentieren,  der  weder von Alice’ Änderungen weiß, noch wie er den Build wieder zum Laufen bekommt. Bob entschließt sich, den _Bug_ nicht zu fixen und lieber Alice zu fragen. Die ist aber mittlerweile im Urlaub …

Wie  gut,  dass  es  dafür `git  rebase`  gibt.  Normalerweise ist dieses Kommando dafür gedacht, die Änderungen eines  Branches  einem  anderen  Branch  aufzupfropfen.[^footnote-rebase]
Dies führt dann am Ende dazu, dass der _Feature-Branch_ einfach gelöscht werden kann und aus Sicht des _Master-Branches_ nie eine Abspaltung stattgefunden hat. Denn im Gegensatz zum gewöhnlichen _Merge_ ensteht nie ein zusätzlicher _Merge Commit._
Wir interessieren uns hier aber für eine andere Anwendung des _Rebase,_ nämlich den eigenen Branch zu verändern.
Dafür steht das Kommando `git rebase -i` zur Verfügung.

Zunächst   muss   Alice   eine   Sicherheitsvorkehrung treffen.  Bevor  man  nämlich  am  Repository  manipuliert, muss  der  aktuelle  Branch  immer  gesichert  werden. _Immer!_
Der  Einfachheit  halber  nehmen  wir  an,  dass  der Branch `master` heißt. Schritt 1 ist also:

    $ git branch master-save

Dies  legt  einen  neuen  Branch  mit  dem  Namen `master-save` an, welcher (noch) identisch mit dem `master` ist. Nun brauchen  wir  die  Commit-ID  des  „ersten“  zu  korrigierenden Commits, z. B. `2dcf093`.

    $ git rebase -i 2dcf093^

Git öffnet nun einen Editor mit der Liste an Commits, beginnend mit `2dcf093`.
(Ohne _caret_ hinter der ID würde die angegebene Revision fehlen.)

Ein Beispiel-Listing:

    pick 2dcf093 ignore *~ files
    pick 636c16e create main file
    pick 9d524d5 configuration
    pick 2aaff98 more ignore
    pick 9f8bc38 build script

    # Rebase 2ae58d7..9f8bc38 onto 2ae58d7
    # ...

An  dieser  Stelle  kann  man  nun  angeben,  was  geändert werden  soll.  Die  Standardeinstellung _pick_  steht  für  das unveränderte Übernehmen eines Commits. Die anderen für uns relevanten Optionen sind:

* `reword`:  Einfaches  Verändern  der  Commit-Beschreibung.
* `edit`: Die zugehörige Revision wird ausgecheckt, wobei man weitere Änderungen machen kann und diese dann per `git commit --amend` übernimmt.
* `squash`:  Fügt  den  vorherigen  und  diesen  Commit  zu einem einzigen zusammen und bietet die Möglichkeit, die gemeinsame Commit-Beschreibung zu ändern.

Möchte  man  einen  Commit  komplett  entfernen  (weil dort z. B. private Einstellungen oder Passwörter enthalten sind), so genügt es, die entsprechende Zeile zu entfernen.  Es  können  auch  Commits  umsortiert  werden, in dem man einfach die Zeilen verschiebt. Möchte man den Rebase komplett abbrechen, so muss man sämtliche Zeilen aus der Datei löschen und speichern. Andernfalls führt Git den Rebase auch durch, wenn man sonst nichts verändert hat!

In  unserem  Fall  möchte  Alice  nun  folgende  Änderungen durchführen:

* Beide Commits an der `.gitignore` zusammenfassen.
* Die Konfigurationsdatei entfernen, da ihr persönlicher API-Key darin steht.
* Dem Build-Skript Ausführungsrechte geben.

Daher  bearbeitet  sie  die  Datei  wie  folgt,  speichert  und beendet den Editor.

    pick 2dcf093 ignore *~ files
    squash 2aaff98 more ignore
    pick 636c16e create main file
    edit 9f8bc38 build script

Unmittelbar danach öffnet Git ein neues Editor-Fenster mit folgendem Text

    # This is a combination of 2 commits.
    # The first commit's message is:

    ignore *~ files

    # This is the 2nd commit message:

    more ignore

Diesen  ändert  sie  nach  Wunsch,  speichert  und  schließt erneut. Nun findet Alice wieder ihren _Prompt_ vor, wobei Git genaue Instruktionen gibt, wie fortzufahren sei.

    $ vim build.sh
    $ git update-index --chmod=+x build.sh
    $ git status
    $ git commit --amend # speichern und beenden
    $ git rebase --continue
    Successfully rebased and updated refs/heads/master.

Natürlich können in diesem Prozess auch Konflikte auftreten,  insbesondere  beim  Umsortieren  von  Commits. Diese  können  aber  wie  üblich  aufgelöst  werden,  indem man  die  betreffenden  Dateien  bearbeitet  und  dann  per `git add` als gelöst markiert. Entschließt man sich den Rebase  abzubrechen,  kann  man  dies  per `git rebase --abort` tun.

Alice  hingegen  hat  den  ganzen  Rebase  komplett durchgeführt  und  findet  nun  einen  neuen  Master-Branch vor. Wie sie sich leicht per `git diff master master-save` überzeugen  kann,  sind  die  gewünschten  Änderungen übernommen worden. Da sie nun ihre Sicherung nicht mehr benötigt, kann sie diese mit einem beherzten `git  branch  -D  master-save` wieder  loswerden.  (Achtung: Dieses Kommando „entfernt“ Objekte aus dem Repository  und  ist  daher  mit Vorsicht  zu  genießen.)  Die  neue Geschichte sieht nun so aus:

    $ git log --pretty=oneline --abbrev-commit 2ae58d7..HEAD
    5ff374e build script
    ca2ad78 create main file
    a33f579 ignore stuff

(Man beachte, dass `git log` standardmäßig die Commits in umgekehrter Reihenfolge wie `git rebase -i` anzeigt.)

Der nun restlos funktionierende Code kann gepusht werden.

Doch halt, was wäre, wenn Alice dies bereits gepusht hätte? Oder sie gar fremde Commits mitverändert hätte? Beim  Rebasen  werden  sämtliche  Folge-Commits  verändert – die Commits bekommen jeweils eine neue ID, daher  müssen  auch  die  darauf  folgenden  eine  neue ID bekommen.

Stellen  wir  uns  also  vor,  Alice  hätte  als  Letzte  ihre Änderungen  gepusht,  Bob  pullt  und  Alice  macht  einen Rebase und pusht erneut mit `git push -f`, was im Remote Repository dazu führt, dass ihre ursprüngliche Geschichte durch die neue ersetzt wird.
Bob pullt nun erneut und findet folgende Situation vor. Seine Master-Branch entspricht Alice’ „alter“, sein `origin/master`-Branch ihrer „neuen“ Geschichte.
Git  stellt  nun  fest,  dass beide  Branches seit dem Commit `2ae58d7` divergieren und beginnt nun zu mergen.
Davon abgesehen, dass es höchstwahrscheinlich  Konflikte  geben  wird  (und  Alice  schon  wieder  im Urlaub ist), hat Bob nun auch unter Umständen doppelte Commits – nämlich alle aus beiden Geschichten.

Was  lernen  wir  daraus?  Git  folgt  der  Unix-Philosophie  –  man  kann  alles  tun,  ist  aber  für  sein  Handeln selbst verantwortlich. Das gilt auch beim Verändern der Geschichte. Ein mächtiges Werkzeug zur rückwirkenden Fehlerkorrektur, aber auch ein geeignetes Mittel um wochenlange Arbeit zu vernichten.

[^footnote-svn]: siehe auch [_Überholt: Subversion ist obsolet_]({% link _articles/svn-git.md %})
[^footnote-unix]: Dieses Szenario ist dem Autor passiert.
[^footnote-rebase]: Oder diese damit zu „veredeln“, wenn man diesen Ausdruck bevorzugt.

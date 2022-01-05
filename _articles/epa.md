---
title: Ein kurzer Bericht über die elektronische Patientenakte
pub_date: 2021-12-04
lang: de
---

Da ich dieses Jahr bei zahlreichen Fachärzt:innen wegen ein und derselben Krankheit behandelt worden bin, kam mir früh der Wunsch, sämtliche Behandlungsakten zusammenzutragen.
Zunächst habe ich meine eigene „private Akte“ angelegt und dort Befunde gesammelt.
Teilweise musste ich diese noch bei verschiedenen Praxen anfragen (z.B. der Bereitschaftspraxis, bei der ich ursprünglich vorstellig war).
Das hat mehr oder weniger gut geklappt:
Die Bereitschaftspraxis hat mir beispielsweise nur Kopien der ausgestellten Kassenrezepte geschickt, aber keine genaueren Details.
Ich hatte allerdings zumindest mal die Informationen beisammen, die für die weitere Behandlung notwendig war.

Einige Monate später hatte mir meine Augenärztin empfohlen, nochmals ein Blutbild zur Kontrolle meiner Leberwerte anfertigen zu lassen.
So weit, so gewöhnlich.
Mitte des Jahres hatte das meine Hausärztin schon einmal gemacht, wobei sämtliche Werte „unauffällig“ waren.

An dieser Stelle fiel mir aber auf, dass es ja eigentlich völlig unsinnig ist, dass ich diese Daten zusammentragen und an die Augenärztin weitergeben muss.
Im Laufe des Jahres sollen ja schließlich alle Praxen an die elektronische Patientenakte (ePA)[^footnote-epa] angeschlossen werden.
Ein klassischer Anwendungsfall!

Also, geschwind die ePA-App meiner Krankenkasse herunterladen.
Natürlich schlägt die Registrierung fehl, denn ich benötige zunächst eine elektronische Gesundheitskarte (eGK).
Diese ist NFC-fähig und eignet sich zur Authentifizierung in der App.
Die App informiert mich darüber, dass ich so eine postalisch erhalten würde.

Tatsächlich ging das auch recht schnell.
Nur wenige Tage später hielt ich die eGK in den Händen und konnte die Registrierung fortsetzen.
Oder – um genauer zu sein – noch einmal von vorne beginnen.
Das hat nun geklappt und ich konnte mich in der App anmelden.
Interessanterweise scheint hinter der App eine zentrale IAM-Infrastruktur zu stehen.
Weder hängt diese mit dem Patient:innen-Login auf der Webseite meiner Krankenkasse zusammen, noch ist mir klar, ob man die ePA gegebenenfalls auch per Browser aufrufen kann.

Aber Obacht: Nach der Registrierung ist vor der Registrierung!
Denn obwohl mein Account jetzt steht, ist noch keine ePA für mich angelegt.
Dazu muss ich mich identifizieren.
Die App stellt mich vor die Wahl: per eGK oder Postident?
Logischerweise wolle ich mich für eGK entscheiden, denn diese habe ich ja jetzt in der Hand.
Die dafür notwendige PIN aber nicht.
Den PIN-Brief hat die Postkutsche noch nicht gebracht.

Ich entscheide mich also für Postident.
Dank topmoderner Technologie und Postident-App kann ich das Postidentverfahren im Schnelldurchlauf – nämlich mithilfe meines Personalausweises mit eID-Funktionalität – absolvieren.

Identifiziert bin ich nun und ebenso stolzer Eigentümer einer elektronischen Patientenakte.
Aber die letzte Hürde ist noch nicht genommen.
Denn ich muss mich für ein Authentifizierungsverfahren entscheiden.
Das ist tatsächlich sinnvoll; so kann nicht jede Person, die mein Telefon in der Hand hält, auf meine Akte zugreifen.
Zur Vergabe einer App-PIN werde ich gezwungen, zusätzlich muss ich mich zwischen eGK oder „al.vi“ entscheiden.

Puh.
Für eGK fehlt mir immer noch die zugehörige PIN.
Und was „al.vi“ ist, weiß ich nicht.
Die [Gematik klärt auf](https://web.archive.org/web/20210513065012/https://www.gematik.de/glossar/begriffe/alternative-versichertenidentitaet/541/):[^footnote-gematik]

> Mit Hilfe einer alternativen Versichertenidentität [al.vi] kann sich ein Versicherter ohne eGK am ePA-Aktensystem identifizieren. Die Identität wird z.B. von einem ePA-Modul FdV an einem Signaturdienst erfragt und von diesem nach Authentisierung des Versicherten ausgestellt.

Alle Klarheiten beseitigt?
Ich beschließe also, auf die Postkutsche mit dem PIN-Brief zu warten.
Das hat ungefähr zwei Wochen gedauert und erforderte zwei Anrufe bei der Krankenkasse.

Mit der eGK-PIN ausgerüstet gelingt nun auch endlich der Zugriff auf die ePA.
Diese ist … leer.[^footnote-expect]
Aber, kein Problem!
Meine Hausärztin kann diese sicherlich mit dem Befund befüllen.[^footnote-befund]

Ich maile also der Praxis, dass sie den Befund bitte in die ePA hochladen sollen.
Antwort:

> Welche elektronische Patientenakte?

Keine Pointe.

**Nachtrag:** Dieser Artikel wurde von mehreren Menschen auf Twitter aufgegriffen, die die ePA aus verschiedenen Gesichtspunkten kritisieren und ablehnen.
Daher möchte ich folgendes klarstellen:
Natürlich lasse ich Datenschutzbedenken gelten; außerdem die mangelhafte technische Umsetzung.
Ich möchte hier nicht argumentieren, dass alle die (aktuelle Implementierung der) ePA benutzen sollten und damit alle Probleme gelöst sind.
Mir geht es einzig und allein darum, dass es für Patient:innen eindeutig zu schwer ist, Einsicht in ihre (vollständigen!) Behandlungsakten zu erhalten.
Was nützt mir ein Hausarzt, der mir sagt, dass mein Blutbild in Ordnung sei, wenn ein weiterbehandelnder Arzt im Notfall das nicht nachvollziehen kann (z.B. genau welche Parameter untersucht worden sind)?
Ob die Lösung dafür jetzt „ePA“ oder irgendwie anders heißt, spielt hier keine Rolle.

[^footnote-gematik]: Aus unerfindlichen Gründen ist dieser Eintrag von der offiziellen Gematik-Seite verschwunden; Stand Januar 2022 ist dort keine Spur mehr von „al.vi“.
[^footnote-epa]: Nicht zu verwechseln mit dem elektronischen Personalausweis (abgekürzt nPA). Ebenfalls nicht zu verwechseln mit der elektronischen Gesundheitsakte (eGA).
[^footnote-expect]: I don't know what I expected.
[^footnote-befund]: Erinnert ihr euch noch? Das mit dem Blutbild. Der Anlass dieser ganzen Sache hier.

---
title: Functional Mocking
abstract: |
  Mocking is an infamous technique from object-oriented programming.
  The goal is to be able to test stateful systems in small pieces by simulating the behaviour of certain objects.
  The problem with mocking is that it usually requires heavyweight frameworks and clutters test code.
  There are countless rants on that topic, but this talk isn't one.
  Instead, we'll explore the functional approach in Haskell: Designing a small language supporting the desired behaviour, and then writing interpreters which can execute its semantics in various ways.
  Testing I/O code was never easier.
slides:
  file: "slides"
  length: 63
  width: 960
video: { id: 125038982, site: vimeo }
conferences:
  - conference: "Lambda Days"
    date: 2015-02-26
    location: Kraków, Poland
    link: "http://www.lambdadays.org/lambdadays2015/lars-hupel"
    recording: "https://vimeo.com/125038982"
    slides: "https://speakerdeck.com/larsrh/functional-mocking"
  - conference: "Regensburg Haskell Meetup"
    date: 2015-03-16
    location: Regensburg, Germany
    link: "https://www.meetup.com/Regensburg-Haskell-Meetup/events/220597934/"
    slides: "https://speakerdeck.com/larsrh/free-functors-and-monads"
  - conference: "Oslo Socially Functional Programmers"
    date: 2015-06-23
    location: Oslo, Norway
    link: "https://web.archive.org/web/20151003155233/https://www.meetup.com/Oslo-Socially-Functional/events/223097000/"
    slides: "https://speakerdeck.com/larsrh/functional-mocking-oslosfp-edition"

---

## Demo code

```haskell
{-# LANGUAGE GADTs #-}
{-# LANGUAGE RankNTypes #-}
{-# LANGUAGE TypeOperators #-}

module Terminal where

import Control.Monad.Free (Free, liftF, iterM)
import Control.Monad.State
import Data.Functor.Coyoneda (Coyoneda (Coyoneda), liftCoyoneda)

type FreeC f = Free (Coyoneda f)

type f ~> g = forall a. f a -> g a

runFreeC :: Monad g => (f ~> g) -> FreeC f a -> g a
runFreeC f = iterM $ \(Coyoneda g i) -> f i >>= g

liftC :: f a -> FreeC f a
liftC = liftF . liftCoyoneda


data Terminal a where
  ReadLine :: Terminal String
  WriteLine :: String -> Terminal ()

type TerminalIO = FreeC Terminal

readLine    = liftC ReadLine
writeLine s = liftC (WriteLine s)


terminalToIO :: Terminal ~> IO
terminalToIO ReadLine = getLine
terminalToIO (WriteLine s) = putStrLn s

type MockTerminal = ([String], [String])

terminalToState :: Terminal ~> State MockTerminal
terminalToState ReadLine = do
  (i, o) <- get
  case i of
    h : t -> do
      put (t, o)
      return h
    [] ->
      return ""
terminalToState (WriteLine s) = do
  (i, o) <- get
  put (i, o ++ [s])


program :: TerminalIO ()
program = do
  line <- readLine
  writeLine line
```

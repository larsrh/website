---
topic: Network Security
icon: fa-shield
summary: |
  Building blocks for high- and low-level network security policies, in collaboration with Cornelius Diekmann.
pubs:
  - title: "Directed Security Policies: A Stateful Network Implementation"
    id: "directed-security-policies"
    authors: ["cornelius", "lars", "carle"]
    in: "Third International Workshop on Engineering Safety and Security Systems (ESSS)"
    year: 2014
    doi: "10.4204/EPTCS.150.3"
    abstract: |
      Large systems are commonly internetworked. A security policy describes the communication relationship
      between the networked entities. The security policy defines rules, for example that A can
      connect to B, which results in a directed graph. However, this policy is often implemented in the
      network, for example by firewalls, such that A can establish a connection to B and all packets belonging
      to established connections are allowed. This stateful implementation is usually required for the
      network’s functionality, but it introduces the backflow from B to A, which might contradict the security
      policy. We derive compliance criteria for a policy and its stateful implementation. In particular,
      we provide a criterion to verify the lack of side effects in linear time. Algorithms to automatically
      construct a stateful implementation of security policy rules are presented, which narrows the gap
      between formalization and real-world implementation. The solution scales to large networks, which
      is confirmed by a large real-world case study. Its correctness is guaranteed by the Isabelle/HOL
      theorem prover
  - title: "Semantics-Preserving Simplification of Real-World Firewall Rule Sets"
    id: "iptables-simp"
    authors: ["cornelius", "lars", "carle"]
    in: "Formal Methods (FM)"
    year: 2015
    springer: true
    doi: "10.1007/978-3-319-19249-9_13"
    arxiv: "1604.00206"
    code: "https://github.com/diekmann/Iptables_Semantics"
    slides: "https://speakerdeck.com/larsrh/semantics-preserving-simplification-of-real-world-firewall-rule-sets"
    abstract: |
      The security provided by a firewall for a computer network
      almost completely depends on the rules it enforces. For over a decade, it
      has been a well-known and unsolved problem that the quality of many
      firewall rule sets is insufficient. Therefore, there are many tools to analyze
      them. However, we found that none of the available tools could
      handle typical, real-world iptables rulesets. This is due to the complex
      chain model used by iptables, but also to the vast amount of possible
      match conditions that occur in real-world firewalls, many of which are
      not understood by academic and open source tools.
      In this paper, we provide algorithms to transform firewall rulesets. We
      reduce the execution model to a simple list model and use ternary logic
      to abstract over all unknown match conditions. These transformations
      enable existing tools to understand real-world firewall rules, which we
      demonstrate on four decently-sized rulesets. Using the Isabelle theorem
      prover, we formally show that all our algorithms preserve the firewall’s
      filtering behavior.
  - title: "IP Addresses"
    id: "afp-ip"
    authors: ["cornelius", "julius", "lars"]
    in: "Archive of Formal Proofs"
    year: 2016
    entry: "https://www.isa-afp.org/entries/IP_Addresses.html"
    abstract: |
      This entry contains a definition of IP addresses and a library to work with them. Generic IP addresses are modeled as machine words of arbitrary length. Derived from this generic definition, IPv4 addresses are 32bit machine words, IPv6 addresses are 128bit words. Additionally, IPv4 addresses can be represented in dot-decimal notation and IPv6 addresses in (compressed) colon-separated notation. We support toString functions and parsers for both notations. Sets of IP addresses can be represented with a netmask (e.g. 192.168.0.0/255.255.0.0) or in CIDR notation (e.g. 192.168.0.0/16). To provide executable code for set operations on IP address ranges, the library includes a datatype to work on arbitrary intervals of machine words.
  - title: "Iptables Semantics"
    id: "afp-iptables"
    authors: ["cornelius", "lars"]
    in: "Archive of Formal Proofs"
    year: 2016
    entry: "https://www.isa-afp.org/entries/Iptables_Semantics.html"
    abstract: |
      We present a big step semantics of the filtering behavior of the Linux/netfilter iptables firewall. We provide algorithms to simplify complex iptables rulests to a simple firewall model and to verify spoofing protection of a ruleset. Internally, we embed our semantics into ternary logic, ultimately supporting every iptables match condition by abstracting over unknowns. Using this AFP entry and all entries it depends on, we created an easy-to-use, stand-alone Haskell tool called fffuu. The tool does not require any input — except for the iptables-save dump of the analyzed firewall — and presents interesting results about the user's ruleset. Real-Word firewall errors have been uncovered, and the correctness of rulesets has been proved, with the help of our tool.
  - title: "Verified iptables Firewall Analysis and Verification"
    id: "verified-iptables"
    authors: ["cornelius", "lars", "julius", "max", "carle"]
    springer: true
    doi: "10.1007/s10817-017-9445-1"
    in: "Journal of Automated Reasoning (Open Access)"
    year: 2018
    abstract: |
      This article summarizes our efforts around the formally verified static analysis of
      iptables rulesets using Isabelle/HOL. We build our work around a formal semantics of the
      behavior of iptables firewalls. This semantics is tailored to the specifics of the filter table and
      supports arbitrary match expressions, even new ones that may be added in the future. Around
      that, we organize a set of simplification procedures and their correctness proofs: we include
      procedures that can unfold calls to user-defined chains, simplify match expressions, and
      construct approximations removing unknown or unwanted match expressions. For analysis
      purposes, we describe a simplified model of firewalls that only supports a single list of rules
      with limited expressiveness. We provide and verify procedures that translate from the complex
      iptables language into this simple model. Based on that, we implement the verified generation
      of IP space partitions and minimal service matrices. An evaluation of our work on a large
      set of real-world firewall rulesets shows that our framework provides interesting results in
      many situations, and can both help and out-compete other static analysis frameworks found
      in related work.
---

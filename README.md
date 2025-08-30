# CS714 Research Project

## A Survey of Sender Anonymity in Messaging and Communication

**This project presents a comprehensive survey and comparative analysis of modern systems and cryptographic techniques designed to ensure sender anonymity. It investigates 15 prominent solutions, from theoretical protocols to practical applications like Tor, evaluating their underlying technologies such as Mixnets, Dining Cryptographer Networks (DC-nets), and Private Information Retrieval (PIR). The core objective is to synthesize the advancements, strengths, and inherent trade-offs in the ongoing effort to protect user privacy and metadata in digital communication.**

## Key Contributions
* **Comprehensive Literature Review:** Conducted an in-depth analysis of 15 distinct systems aimed at achieving sender anonymity, including Sabre, Riposte, Tor, and Vuvuzela.
* **Comparative Analysis:** Authored a detailed comparative table evaluating each system on key metrics like cryptographic technologies, setup requirements, use cases, and known vulnerabilities.
* **Synthesis of Techniques:** Summarized and categorized a wide array of privacy-preserving technologies, including Distributed Point Functions (DPFs), Multi-Party Computation (MPC), Differential Privacy, and Onion Routing.
* **Identification of Trends:** Highlighted the evolution of anonymous communication systems, from foundational concepts to recent advancements addressing scalability and metadata protection.

## Summary of Findings

**This survey reveals a diverse landscape of solutions for sender anonymity, each with unique strengths. Systems like Tor and LiLAC leverage Onion Routing for low-latency anonymous browsing, while protocols like Riposte and Sabre utilize Multi-Party Computation (MPC) and Distributed Point Functions (DPFs) to provide strong, scalable anonymity for millions of users in bulletin-board models.**
**A recurring challenge is the trade-off between privacy, performance, and scalability. While DC-nets (used in Spectrum) offer strong theoretical anonymity, they often face scalability issues. In contrast, systems like Vuvuzela and Stadium employ Differential Privacy to offer provable privacy guarantees at a massive scale, but this often comes at the cost of increased bandwidth and latency. The analysis indicates a trend towards hybrid models that combine multiple cryptographic primitives to balance these competing requirements.**

## How To Cite

`@inproceedings{yourname2024sender,
  title={A Survey of Sender Anonymity in Messaging and Communication},
  author={Sahil Basia and Adithya Vadapalli},
  booktitle={Secure Computation Project Report 2024`

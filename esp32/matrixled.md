---
marp: false
theme: uncover
class: invert
paginate: true
title: ESP32 Haxs
math: katex

---

# ESP32 Module

* Setup
* LED Matrix
* 4-digit LED clock
---
## Setup

Platform IO - Arduino Framework

---

# LED Matrix

* ESP32 - MAX7219 Module Connection

$$
\begin{array} {|r|r|}
    \hline \text{ PIN } & \text{ MAX7219 } & \text{ ESP32 } \\ 
    \hline \text{VCC} & \text{VCC} & \text{VIN} \\ 
    \hline \text{GND} & \text{GND} & \text{GND}         \\ 
    \hline \text{DIN} & \text{D23} & \text{data pin}    \\ 
    \hline \text{serial clock} & \text{CS } & \text{D5 } \\ 
    \hline \text{chip sel}     & \text{CLK} & \text{D18} \\
    \hline  
\end{array}
$$




+++
title = 'Building a Basic Piano Chord Explorer'
date = 2025-04-11T22:30:00+01:00
tags = ["Piano", "Web Development", "Music Theory", "Chords"]
categories = ["Music Blog"]
+++

I recently created a simple web-based tool to help visualize piano chords as part of my ongoing piano learning journey. The **Piano Chord Explorer** was built to quickly visualize chords for another project I'm working on, but I thought it might be helpful for others learning piano and music theory.

## The Tool

The Piano Chord Explorer is a simple web application that displays piano chords and their inversions with sound playback. You can:

- View major, minor, diminished, augmented, and 7th chords
- See chord inversions (root position, first inversion, second inversion)
- Interact with a visual piano keyboard
- Play chord sounds with Web Audio API
- See finger position suggestions

The tool is still very raw and early in development, but already provides a useful way to visualize and hear different chord structures.

## Try It Out

You can try the Piano Chord Explorer here:
[Piano Chord Explorer](https://davehogan.co.uk/PianoChordExplorer/)

![Piano Chord Explorer Screenshot](https://github.com/DaveHogan/PianoChordExplorer/raw/main/src/assets/Screenshot.png)

## Why I Built It

As I've been learning piano, I've found that understanding chord structures visually has been incredibly helpful. While there are many excellent resources out there, I wanted something simple that I could quickly reference and that would show:

1. The notes that make up a chord
2. How those notes are positioned on a piano keyboard
3. How inversions change the chord's sound and fingering
4. The ability to hear the chord

I also wanted to print out some of these chord without fancy graphics or backgrounds. I've not implemented this yet but have manually created PDFs for my own use.

## How It Was Built

The tool is built with simple web technologies and zero frameworks. Whilst I'm a programmer in my professional day to day, what I did here anyone can do as I actually used AI, Cursor and Claude for most of the heavy lifting. It's very tempting to technically over engineer this for what I needed but I didn't use any of my day to day skill to build this:
- HTML for structure
- CSS for styling
- JavaScript for interactivity
- Web Audio API for sound generation

I opted for a minimal approach without frameworks to keep it lightweight and focused. The entire tool is client-side, meaning it runs entirely in your browser without needing a server. Project structure and standards is non-existent currently.

## Future Improvements

Some improvements I'm considering for future versions

- Adding more chord types (9th, 11th, 13th, suspended, etc.)
- Improving sound quality with better synthesis or samples
- Making the design responsive for mobile devices
- Adding chord progressions and voice leading examples
- Including staff notation for better musical representation
- Improving accessibility

## Open Source

The source code is available on GitHub if you'd like to contribute or adapt it for your own needs:
[GitHub Repository](https://github.com/DaveHogan/PianoChordExplorer)

## Learning Through Building

One thing I've found incredibly valuable is how much you can learn about a subject by building tools for it. Creating this chord explorer has somewhat helped my understanding of chord theory.

If you're learning piano or any instrument, I encourage you to experiment with it and see if it helps in your music theory journey. And if you have suggestions for improvements, feel free to open an issue or submit a pull request on GitHub!

Happy chord exploring! 
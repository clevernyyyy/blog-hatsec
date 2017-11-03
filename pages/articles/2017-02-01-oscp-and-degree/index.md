---
title: OSCP & Degree
date: "2017-02-10T22:40:32.169Z"
layout: post
path: "/oscp-and-degree/"
readTime: "20"
category: "Cert Review"
description: "Having recently completed both my Master's degree in Information Assurance and my Offensive Security Certification Professional exam, I'm ready to take on the world!  Come read about my reviews and critiques of each, it might not turn out how you think."
---

At the end of 2016, I completed two big steps in my quest to start a career in information security: my Master's Degree in Information Assurance and my <a class='md-link' href='https://www.offensive-security.com/information-security-certifications/oscp-offensive-security-certified-professional/'>OSCP certification</a>.  Both experiences helped shape me, some more than others, and I am now prepared to help businesses and organizations better secure their applications.  In this initial blog post, I plan to review both and talk about what worked, what didn't, and offer any advice I can pass along.

## Degree

In 2011, I was a full-time software developer interested in computer security.  When I got word that my alma mater was creating a Master's degree in Information Assurance I spoke to the head of the department about it and enrolled.  Most of my classes were at night except for a few prerequisites that I had to fit in over my lunch hour, so it was going to be quite a bit of work.

#### Classes

The classes were interesting after I got past a lot of introductory material.  My <a class='md-link' href='https://www.unomaha.edu'>university</a> had just accredited the <a class='md-link' href='http://unomaha.smartcatalogiq.com/en/2016-2017/Graduate-Catalog/Graduate-Degree-Programs-Certificates-Minors/Information-Assurance/Information-Assurance-MS'>master's degree program</a> so several courses were a work in progress, but I got a wide-range of experiences.  Some examples would be cryptography, embedded systems, reversing classes, and secure development courses. Unfortunately, the curriculum left a few gaps that luckily I was able to fill with extracurriculars.

#### Extracurriculars

I highly, highly recommend joining or starting a cyber security club at your university.  It was one of the places I learned the most during my time at school.  My school had a group of undergraduates who started a cyber security group to compete in capture-the-flag events that was already in place when I enrolled.  Each week they discussed topics not covered in the curriculum and competed in CTF competitions.  It was a great place to not only meet friends, but start the practice of exploring topics of interest on my own.

In the security world, information moves rapidly and knowledge is ever-changing - so it benefits you to stay as up to date as possible and <b>always be learning</b>.  When I started researching and reading about security topics outside of class not only did I become more well versed in topics that I enjoyed, but I also developed new interests in areas of concentration that had previously been unknown to me.  Once you're able to spend some of your time learning outside of the classroom, it makes a big difference in equipping your infosec skillset.

Joining UNO's cyber security group did more than just improve my ability to learn outside of the classroom. It also gave me a safe place to practice.  I was able to work in lab environments with malicious code, I got to attack boxes to escalate privileges and I was able to compete in quite a few CTF competitions.  Competing in capture-the-flag events was great because I was able to focus almost exclusively on offensive security which is what I really loved despite not having any classes with an offensive concentration.  Joining the cyber security club ultimately led to me to one of my best decisions - taking the OSCP.

## OSCP

After hearing about the Offensive Security Certified Professional exam, I knew that I had to try it out.  A course and exam put on by the same group who help developed <a class='md-link' href='https://www.kali.org/'>Kali Linux</a> and <a class='md-link' href='https://www.exploit-db.com/'>ExploitDB</a> held great distinction among security professionals.  When deciding on signing up, I felt like I would benefit the most from a 90 day lab time purchase because my university had very few offensive classes.  After signing up I received a video, a pdf with exercises, a Kali Linux ISO and lab access thru OpenVPN.  I had 90 days to practice the lab, complete the exercises and study exploitation.  The test was scheduled for a 48 hour period - 24 hours exam lab time and then 24 hours for writeups.

#### Exercises

Initially, I started pouring over the videos and meticulously stepping through the exercises.  However, I found this very slow moving and it was taking up a lot of my lab time.  Eventually, I opted out of the exercises since I now owned the material and could theoretically work through them on my own time.  I decided to focus solely on the lab boxes because that's really what I paid for.

#### Lab Time

Getting started was not easy.  I had never really had any offensive experience outside of CTF events and those challenges typically had a clear path or attack vector.  Most of my early attempts at breaking into boxes started with simple `nmap` scans and then searching for non-standard ports.  Little did I realize that is pretty close to what I should be doing in a typical penetration test.

Eventually, I came up with a pretty standard method for exploring the boxes.

1.  <b>Enumerate the box.</b>  Run a full `nmap` scan on the box (include all TCP and UDP ports).  I ended up running a large `nmap` scan on the entire network and converted it to html for easy navigation throughout my project.

      * What services are running on the box?
      * Is the box hosting a web application?
      * Are there any ports you're unfamiliar with?  If so, investigate, look up typical services/applications for said port.
      * What kind of OS is it?  If it's something older, you can bet you can find a nice exploit <a class='md-link' href='https://www.exploit-db.com/'>online</a>.
      * And much, much more!

2.  <b>Research.</b>  There were very few times the initial scan pointed me to a particular exploit immediately - you will have to do research.  Fortunately for me, learning new things is one of my favorite activities.  Unfortunately, the level of effort varies immensely from box to box.  Sometimes finding an exploit is as easy as googling <em>"[service name] exploit"</em>, while other times I found myself searching for the jump ESP of a European Windows box.

3.  <b>Understand the Exploit.</b>  As many math teachers have said to you, <div class="highlight-quote">"Sure your calculator can do it for you, but you need to understand how it's calculating it."</div>  <p>The same principle applies in this situation.  Often, you'll find a metasploit module built to utilize the exploit that you discovered, but it's important to know what the exploit is actually doing.  For one, you can only use metasploit once on the exam - so it is important to know how to navigate without it.  Also, often times one module or exploit does not fit all; you will need to modify the source of the exploit in order to get it to work for you.</p>

4.  <b>Execute and Document.</b>  This is the fun part, where you're able to actually witness the fruits of your labor.  Executing a proper attack on a vulnerable box is a very practical method of learning.  You're able to see how your crafted attack actually allows you to gain access to a networked computer.  (It is even more fun if you can RDP into the box post-exploit!)  Be sure to keep careful documentation of how you arrived at this point in case you need to repeat it.  In an actual penetration test, this portion is crucial as the documentation that you provide to your client is what's used by their software team to re-create and patch the vulnerability.

5.  <b>Escalate and Repeat.</b>  Not every box will fall with a single exploit or attack.  More often than not, getting full root access is a multi-step process.  This is another example of how the OSCP prepares you for the real world and provides labs that take more effort than a little online searching.  Their motto Try Harder, really applies throughout the entire process and is now a personal principle I strive for.


All-in-all the lab work was easily my favorite way to learn and something that I kept wishing I had more of.  Lab time is purchased in 30 day increments but can be extended 15, 30, or 60 days.  Although I was ready for the test, I considered extending my time because of the immense fun I was having.  Alas, the amount of time I was putting into the OSCP wasn't the easiest on my family so I ultimately decided against it and scheduled my exam a few days before my initial 90 days were up.  I had solved 29 boxes (including 2 on the subnet), so I got my 5 point exam bonus.

#### Exam

The exam grading breaks down as follows:  

* 5 point bonus for completing all the exercises
* 5 point bonus for rooting at least ten lab boxes
* (2) 25 point boxes
* (2) 20 point boxes
* (1) 10 point box

You were awarded partial points if you got local access to a box, but no more than half total points and received total points if you rooted the box.

Going into exam day I was a little nervous, but I felt pretty prepared.  I had the extra 5 points from the labs and I went into the exam with all of my lab documentation already written and ready to go.  I had heard from previous test takers that one of the questions was a custom buffer overflow exploit, which was my first box to fall.  Shortly afterwards I got a 20 point box, followed by the 10 point box, and I was already within striking distance of a passing grade in under 4 hours.  This is where I hit a temporary brick wall and stalled for several hours - it was almost 6 full hours before I got another 25 point box and safely had enough points to pass the exam.  

It was already 10 hours into the test, but I really wanted to try and get the last box.  Unfortunately for me, I could not figure out how to exploit their seemingly dumb web server.  I won't go into details, but the entire web application seemed doomed to fail - I just couldn't figure it out.  I lost focus and my edge around hour 16 so I ended up calling it quits.  However, as they advised me, I treated this experience like an actual penetration test.  I wrote up a few pages explaining why the web server appeared vulnerable and even though I was unable to figure out an attack vector, someone could.  It is important to call attention to something like that to your clients.

## Summary

It's difficult to summarize both experiences together, so instead I'll compare and contrast them.  I'm confident that getting a degree in Information Security was the right move for me.  However, the degree felt similar to many other areas of study in that, it produces lots of average students and a few excellent ones.  It appeared to me that much of the coursework was intended to move students along instead of challenge them.  As is the case with many things, the degree amounted to what you put into it.  If you took time to learn outside of class, participate in groups with similar interests, and challenged yourself on every semester project you had - well then you likely made the most of that degree.

Starting out, I had difficulty balancing a full-time job, a girlfriend (now wife), and other challenges with my schooling.  Initially, I could easily see myself as a non-challenged student, picking my way through class after class.  Luckily, I was able to grow myself throughout this process into someone I wanted to be - the student who worked hard to challenge himself.  It was towards the end of my time at my university that I started noticing vast differences in me and my friends' projects when compared to other students; and yet, they were passing classes along with us!  So a degree in Information Security is very much worth what you put into it.

Taking the OSCP was an extremely different experience.  Unlike academia, I found that although you can put little effort or maximum effort - only the latter will bear results.  I doubt anyone could pass the OSCP without putting in effort unless they were already an expert.  This is why from a learning standpoint, I much prefer the OSCP method.  If you don't put in full effort and actually <em>learn</em> how to crack boxes, then you simply won't pass.

This has several advantages over the degree.  First, each OSCP certification has the <b>same weight</b>.  No certification is worth more than the other, which was the case with the degree.  And second, each passing student is guaranteed to be of <b>high quality</b>, which again was not the case with the degree.

No method of learning is perfect, and I was able to take advantage of both tracks in ways that helped grow my knowledge and my workmanship.  I can only hope that if you're deciding on one (or both) of these learning paths to advance your career or to get into the field that my reviews help you understand what each is about.

Thanks for sticking through to the end!  If you have any questions/comments feel free to leave them below.
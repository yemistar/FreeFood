<h1>Free Food</h1>

To edit, fork and submit a pull request please!

<h2>Contributing to dataset</h2>

Adding sample emails to the dataset requires a specific process. Simply copying and pasting will not work.

The general form should be as such:
```
[
  {
    "subject": "La te da I am the subject",
    "date": "Oct 4, 2018, 2:58 PM",
    "body": "Body text excluding the signature"
  }
]
```
When coping your body text, save it to a file temporarily as is.
Then, type:
```
sed -E ':a;N;$!ba;s/\r{0,1}\n/\\n/g' file.txt > value.js
```
in Linux to convert the text to json format (replacing new lines by new line characters ( \n )). You can also use:

https://codebeautify.org/json-escape-unescape

to achieve the same thing.

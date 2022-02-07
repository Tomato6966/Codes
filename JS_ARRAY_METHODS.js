// Array Methods!
// Cheatsheet: https://www.shortcutfoo.com/app/dojos/javascript-arrays/cheatsheet
/*
Accessing Elements I - RETURNING NEW ARRAYS (nothing changes with the array)
    a1.concat(a2)        Return new array by joining arrays a1 and a2 together
>   a1.join(separator)   Join all elements of array a1 into a string separated by separator arg
>   a1.slice(start, end) Extract a section from start to end of array a1 and return a new array
>   a1.indexOf(obj)      Return first index of obj within array a1
>   a1.find(fn)          Find first element which is equal to callbackfunction
>   a1.findIndex(fn)     Find Index of first element which is equal to callbackfunction


Iterating I - Accessing the ARRAY (nothing changes with the array)
|   a1.forEach(fn)       Calls function fn for each element in the array a1
    a1.every(fn)         Return true if every element in array a1 satisfies provided testing function fn (BOOELAN true/false)
>   a1.some(fn)          Return true if at least one element in array a1 satisfies provided testing function fn (BOOELAN true/false)
>   a1.filter(fn)        Create a new array with all elements of array a1 which pass the filtering function fn

Iterating II - RETURNING NEW ARRAYS (nothing changes with the array)
>   a1.map(fn)           Create a new array with results of calling function fn on every element in array a1
>   a1.reduce(fn)        Apply a function fn against an accumulator and each value (from left to right) of the array as to reduce it to a single value

Mutating I - CHANGING THE ARRAY
>   a1.pop()             Remove and return last element from array a1
>   a1.shift()           Remove and return first element from array a1
>   a1.push(obj)         Add obj to end of array a1 and return new length
    a1.unshift(obj)      Add obj to start of array a1 and return new length
    a1.reverse()         Reverse order of elements of array a1 in place
>   a1.sort([fn])        Sort the elements of array a1 in place with optional sorting function (<0 | >0)
>   a1.splice(startIndex, deleteCount, [items])    Change content of array a1 by removing existing elements and/or adding new elements

General I
    a1.toString()        Return a string representing array a1 and its elements (same as a1.join(','))
    a1.toLocaleString()  Return a localized string representing array a1 and its elements (similar to a1.join(','))
    Array.isArray(var)   Return true if var is an array
    a1.length            Return length of array a1
    a1[0]                Access first element of array a1
    a1[a1.length - 1]    Access last element of array a1
*/

//const URI = "https://localhost:8443/";
//const DEBUG = true;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const words = 
  [
      {
          id: 0,
          rus: "летать",
          eng: "fly"
      },
      {
          id: 1,
          rus: "пилот",
          eng: "pilot"
      },
      {
          id: 2,
          rus: "больница",
          eng: "hospital"
      },
      {
          id: 3,
          rus: "поместье, имущество, сословие",
          eng: "estate"
      },
      {
          id: 4,
          rus: "квартира",
          eng: "apartment"
      },
      {
          id: 5,
          rus: "пекарня",
          eng: "bakery"
      },
      {
          id: 6,
          rus: "храм",
          eng: "temple"
      },
      {
          id: 7,
          rus: "церковь",
          eng: "church"
      },
      {
          id: 8,
          rus: "зубной врач",
          eng: "dentist"
      },
      {
          id: 9,
          rus: "доктор, врач",
          eng: "doctor"
      },
      {
          id: 10,
          rus: "няня",
          eng: "nurse"
      },
      {
          id: 11,
          rus: "чашка",
          eng: "cup"
      },
      {
          id: 12,
          rus: "буфет",
          eng: "cupboard"
      }, // This feature is in testing
      {
          id: 13,
          rus: "это, этот",
          eng: "this"
      }, 
      {
          id: 14,
          rus: "особенность, свойство",
          eng: "feature"
      }, 
      {
          id: 15,
          rus: "является",
          eng: "is"
      }, 
      {
          id: 16,
          rus: "в",
          eng: "in"
      }, 
      {
          id: 17,
          rus: "тестирование",
          eng: "testing"
      }, 
      
]

const unixTimeZero = Date.parse('01 Jan 1970 00:00:00 GMT');
const startDictionary = 
[
    {
        id: 0,
        lastTraining: unixTimeZero,
        count: 0
    },
    {
        id: 1,
        lastTraining: unixTimeZero,
        count: 0
    },
    {
        id: 2,
        lastTraining: unixTimeZero,
        count: 0
    },
    {
        id: 3,
        lastTraining: unixTimeZero,
        count: 0
    },
    {
        id: 4,
        lastTraining: unixTimeZero,
        count: 0
    }
]

// Backend imitation

let obj;

obj = localStorage.getItem("emails");
let emails = (obj === null) ? [] : JSON.parse(obj);

obj = localStorage.getItem("accountsData");
let accountsData = (obj === null) ? [] : JSON.parse(obj);

obj = localStorage.getItem("userIndex");
let userIndex = (obj === null) ? -1 : obj;

obj = localStorage.getItem("dictionary");
let dictionary = (obj === null) ? startDictionary : JSON.parse(obj);


export function checkLogin()
{
    return new Promise( (resolve, reject) =>
    {
        if (userIndex >= 0)
            setTimeout( ()=> resolve(true), 300 );
        else
            setTimeout( ()=> resolve(false), 500 );
    });
}

export function emailExists(email)
{
    return new Promise( (resolve, reject) => 
    {
        if (emails.includes(email))
            setTimeout( ()=>resolve(true), 1000 );
        else
            setTimeout( ()=>resolve(false), 200 );
    });
}

export function signUp(firstName,lastName,email, password)
{
    emails.push(email);
    accountsData.push({
        firstName: firstName,
        lastName: lastName,
        password: password,
        date: Date.now().toString(),
        words: 5
    });

    localStorage.setItem("emails", JSON.stringify(emails));
    localStorage.setItem("accountsData", JSON.stringify(accountsData));

    return new Promise( (resolve, reject) =>
    {
        setTimeout( ()=>resolve(true), 400 );
    });

}

export function signIn(email,password)
{
    return new Promise( (resolve, reject) =>
    {
        let newUserIndex = emails.indexOf(email);


        if (newUserIndex >= 0 && accountsData[newUserIndex].password === password){
            setTimeout( ()=>resolve(true), 400 );
            localStorage.setItem("userIndex", newUserIndex);
            userIndex = newUserIndex;
        }
        else {
            setTimeout( ()=>resolve(false), 600 );
        }
    });
}

export function exitProfile()
{
    localStorage.setItem("userIndex", -1);

    return new Promise( (resolve, reject) =>
    {
        setTimeout( ()=>resolve(true), 200 );
    });
}

export function getWordLearnData()
{
    return new Promise( (resolve, reject) =>
    {
        let now = Date.now();

        let toRepeat = 0;
        let inAnticipation = 0;

        for (let i = 0; i < dictionary.length; ++i)
        {
            if (dictionary[i].count >= 5)
                continue;

            let dif = now - Date.parse(dictionary[i].lastTraining);
            // 1 3 7 30

            if (dictionary[i].count === 1)
            {
                if (dif/86400000 >= 1)
                    toRepeat++;
                else inAnticipation++
            } else if (dictionary[i].count === 2)
            {
                if (dif/86400000 >= 3)
                    toRepeat++;
                else inAnticipation++
            } else if (dictionary[i].count === 3)
            {
                if (dif/86400000 >= 7)
                    toRepeat++;
                else inAnticipation++
            } else if (dictionary[i].count === 4)
            {
                if (dif/86400000 >= 30)
                    toRepeat++;
                else inAnticipation++
            } else toRepeat++;
        }

        setTimeout( ()=>
        {
            resolve({toRepeat: toRepeat, inAnticipation: inAnticipation});
        }, 400);

    });
}

export function addWordToDict(word, trantlation)
{
    return new Promise( (resolve, reject) => 
    {
        for(let i = 0; i < words.length; ++i)
        {
            if (words[i].eng === word && words[i].rus === trantlation)
            {
                accountsData[userIndex].words++;
                localStorage.setItem("accountsData",JSON.stringify(accountsData));
                dictionary.push( {id: words[i].id, count: 0, lastTraining: ""})
            }
        }

        localStorage.setItem("dictionary",JSON.stringify(dictionary));

        setTimeout( () => resolve(true), 300 );
    });
}

export function removeWordFromDict(word, translation)
{
    return new Promise( (resolve, reject) => 
    {
        let id = -1;

        for(let i = 0; i < words.length; ++i)
        {
            if(words[i].eng === word && words[i].rus === translation)
            {
                id = i;
                break;
            }
        }

        for(let i = 0; i < dictionary.length; ++i)
        {
            if (dictionary[i].id === id)
            {
                accountsData[userIndex].words--;
                localStorage.setItem("accountsData",JSON.stringify(accountsData));
                dictionary.splice(i, 1);
                break;
            }
        }

        
        localStorage.setItem("dictionary",JSON.stringify(dictionary));

        setTimeout( () => resolve(true), 300 );
    });
}

export function getRandomWords()
{
    return new Promise((resolve, reject) => {

        let numset = []
        let nextnum = getRandomInt(0,words.length);

        for(let i = 0; i < 5; ++i)
        {
            while (numset.includes(nextnum))
                nextnum = getRandomInt(0,words.length);
            
            numset.push(nextnum);
        }

        let wordset = []

        /*
            id: 1,
            word: "fly",
            translation: "летать",
            added: true
        */

        for(let i = 0; i < 5; ++i) {
            let word = {
                id: numset[i],
                word: "",
                translation: "",
                added: false
            }

            for(let j = 0; j < words.length; ++j)
            {
                if(words[j].id === numset[i])
                {
                    word.word = words[j].eng;
                    word.translation = words[j].rus;
                }
            }
            
            for(let j = 0; j < dictionary.length; ++j)
            {
                if(dictionary[j].id === numset[i])
                    word.added = true;
            }

            wordset.push(word);
        }
        
        setTimeout( () => resolve(wordset), 500);

    });
}

// admin/getBy?str=[key]
export function getTenWordsByKey(key)
{

    return new Promise( (resolve, reject) => 
    {

        let wordset = []

        for(let i = 13; i < 18; ++i)
        {
            let word = {
                id: i,
                word: words[i].eng,
                translation: words[i].rus,
                added: false
            }
            
            for(let j = 0; j < dictionary.length; ++j)
            {
                if(dictionary[j].id === i)
                    word.added = true;
            }

            wordset.push(word);
        }

        resolve(wordset);

    });

}

// LK
export function getProfileInfo()
{
    return new Promise((resolve, reject) =>
    {

        let data = {
            firstName: accountsData[userIndex].firstName,
            lastName: accountsData[userIndex].lastName,
            level: "Beginner",
            date: accountsData[userIndex].date,
            words: accountsData[userIndex].words,
            email: emails[userIndex]
        }

        setTimeout(() => resolve(data), 1500);

    });
}

export function trainWord(word,translation)
{

}

/*
// URI/session  GET
export function checkLogin()
{ 

    return new Promise((resolve, reject) => {

        if(DEBUG) {
            setTimeout( () => resolve(true), 300);
            return;
        }

        fetch(URI + "session").then ( (response) => 
        {
            console.log("session| response: " + response.ok);

            if (!response.ok)
            {
                reject(false);
                return {};
            }

            return response.text();
            
        }).then( (result) =>
        {
            console.log("session| Data: " + result);
            if (result === "false")
                resolve(false);
            else 
                resolve(true);
        }).catch( (result) => reject(false));

    });
}

// URI/registration POST
export function signUp(firstName,lastName,email, password)
{
    return new Promise((resolve, reject) => {

        if(DEBUG) {
            setTimeout( () => resolve(true), 300);
            return;
        }

        fetch(URI + "registration", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                }
            ), // body data type must match "Content-Type" header
          }).then( (response) => {
            console.log("registration| response: " + response.ok + "; Data: " + response.text());
            resolve(true)
          });

    });
}

// result: true - logged in
// result: false - wrong email or password
// email -> username (МДамд)
// URI/login POST
export function signIn(email, password)
{
    return new Promise( (resolve, reject) => {

        if(DEBUG) {
            setTimeout( () => resolve(true), 300);
            return;
        }

        fetch(URI + "login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(
                {
                    username: email,
                    password: password
                }
            ), // body data type must match "Content-Type" header
          })
          .then( (response) => {
            console.log("login| response: " + response.ok);
            if (response.ok)
                resolve(true);
            else
                resolve(false);
          });

    });
}

// URI/registration/email?name= GET
const DEBUG_EMAILEXIST = false;
export function emailExists(email)
{
    return new Promise((resolve, reject) => {

        if(DEBUG) {
            setTimeout( () => resolve(DEBUG_EMAILEXIST), 300);
            return;
        }

        fetch(URI + "registration/email?name=" + email)
        .then( (response) => 
        {
            console.log("email-exist| response: " + response.ok);
            if(response.ok)
            {
                return response.text();
            } 
            
            reject(false);
            return ""; 
        })
        .then( (res) =>
        {
            resolve(res === "true");
        });

    });
}
*/

//  Все функции запроса на сервер - это promise

const URI = "https://localhost:8443/";
const DEBUG = true;

//const DEBUG_LOGGEDIN = false;

// URI/session
export function checkLogin()
{ 

    return new Promise((resolve, reject) => {

        if(DEBUG) {
            setTimeout( () => resolve(true), 300);
            return;
        }

        fetch(URI + "session",{mode: "no-cors"}).then ( (response) => 
        {
            if (!response.ok) 
            {
                reject(false);
                return {};
            }

            return response.text();
            
        }).then( (result) =>
        {
            if (result === "false")
                resolve(false);
            else 
                resolve(true);
        }).catch( (result) => reject(false));

    });
}

// registration/email?name=[dsfsdfdsf]
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
            resolve(true)
          });

    });
}

// result: true - logged in
// result: false - wrong email or password
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
                    email: email,
                    password: password
                }
            ), // body data type must match "Content-Type" header
          }).catch( (result) => reject(false))
          .then( (response) => {
            if (response.ok)
                resolve(true);
            else
                resolve(false);
          });

    });
}

const DEBUG_EMAILEXIST = false;
export function emailExists(email)
{
    return new Promise((resolve, reject) => {

        if(DEBUG) {
            setTimeout( () => resolve(true), 300);
            return;
        }

        fetch(URI + "registration/email?name=" + email).catch( (result) => reject(false))
        .then( (response) => 
        {
            if(response.ok)
            {
                let ans = response.text();
                if (ans === "true")
                    resolve(true);
                else
                    resolve(false);
            } else reject(false);
        }).catch( (result) => reject(false));

    });
}

// admin/getWords
export function getRandomWords()
{
    return new Promise((resolve, reject) => {

        setTimeout( () => resolve(DEBUG_EMAILEXIST), 500);

    });
}

// admin/getBy?str=[key]
export function getTenWordsByKey(key)
{

}

// LK
export function getProfileInfo()
{
    return new Promise((resolve, reject) =>
    {

        //...

        let data = {
            firstName: "name",
            lastName: "last",
            level: "Beginner",
            date: "Sat Nov 11 16:18:27 GMT+07:00 2023",
            words: 0,
            email: "email"
        }

        setTimeout(() => resolve(data), 3000);

    });
}
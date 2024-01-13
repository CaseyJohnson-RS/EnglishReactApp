
//  Все функции запроса на сервер - это promise

const DEBUG_LOGGEDIN = true;
export function checkLogin()
{
    // Я не знаю, как ты это будешь делать, но это
    // ты будешь делать здесь

    return new Promise((resolve, reject) => {

        if (DEBUG_LOGGEDIN) {
            setTimeout( () => resolve(true), 2000);
        } else {
            setTimeout( () => resolve(false), 1500);
        }

    });
}

// registration/email?name=[dsfsdfdsf]
export function signUp(firstName,lastName,email, password)
{
    return new Promise((resolve, reject) => {

        setTimeout( () => resolve(true), 500);

    });
}

const DEBUG_EMAILEXIST = false;
export function emailExists(email)
{
    return new Promise((resolve, reject) => {

        setTimeout( () => resolve(DEBUG_EMAILEXIST), 500);

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
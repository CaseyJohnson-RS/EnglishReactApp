
//  Все функции запроса на сервер - это promise

const DEBUG_LOGGEDIN = false;
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

    })
}
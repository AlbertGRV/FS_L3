const bcrypt = require('bcryptjs');
const { config } = require('dotenv');
require('dotenv').config();

const Passwords = [
    "Xj2pL9mFkT", "Bn7vQ3rZxW", "Pd5fG8hJkL",
    "Mn4cV9bRtY", "Qw1eRtYuIo", "Zx3cVbNmAs",
    "Lk5jHgFdSa", "Po9iUyTrEw", "Nm6bVcXzLk",
    "Jh8gFdSaPq", "Rt2yUiOpAs", "Yu3iOpLkJh",
    "Gf4dSaPlKj", "Hj6kLpOiUy"
];

password.forEach((elem, index)=>{
    console.time(`hashTime ${index+1}`);
    const hash = bcrypt.hashSync(elem,10);
    console.timeEnd(`hashTime ${index+1}`);
    console.log(`hash: ${index+1}: ${hash}`)
})
console.log(`Время хэширования пароля может варьироваться в зависимости от загруженности системы, доступных ресурсов процессора, состояния памяти и формата пароля.`)

console.log(`Mode=${process.env.MODE}`)
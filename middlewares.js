const users=require("./users.json")
function authenticate(req, res, next) {
    if (req.method === "POST") {
        const { username, password } = req.body ;
        if (!username || !password) return res.send("Username or password missing");

        const user = users.find(u => u.username === username && u.password === password);
        if (!user) return res.send("Invalid credentials");

        req.user = user;
        next();
    } else {
        if (req.cookies.user) {
            next();
        } else {
            res.redirect("/login.html");
        }
    }
}

module.exports = { authenticate };

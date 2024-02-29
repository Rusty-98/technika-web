// get-login-flag.js

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Fetch the login flag from environment variable
        const loginFlag = process.env.REACT_APP_LOGIN_FLAG;

        res.status(200).json({ success: true, loginFlag });
    } else {
        res.status(405).end();
    }
}

// Function to validate src parameter
function validateSrc() {
    if (!unr) {
        unr = "szsupunma";
        return
    }
    let spl = unr.split("/");
    if (spl.length < 2 || spl[1] == "") {
        return throwError();
    }
}

// Function to setup fork button
function setupForkButton() {
    if (unr == "szsupunma") {
        document.getElementById("fork").innerHTML = `<a class="github-button" href="https://github.com/szsupunma/" data-color-scheme="no-preference: dark_dimmed; light: dark_dimmed; dark: dark_dimmed;" data-size='large' aria-label="Follow @szsupunma on GitHub">Follow @szsupunma</a>`
    } else {
        document.getElementById("fork").innerHTML = `<a class='github-button' href='https://github.com/${unr}' data-color-scheme='no-preference: dark_high_contrast; light: dark_dimmed; dark: dark_dimmed;' data-icon='octicon-repo-forked' data-size='large' data-show-count='true' aria-label='Fork ${unr} on GitHub'>Fork it!</a>`
    }
}


// Function to redirect to heroku
function redirectToHeroku() {
    let input = document.getElementById("repo-link").value;
    if (!input || input == "") {
        return throwError(true, "Please enter your forked repo link!");
    }

    if (input.includes(unr)) {
        return throwError(true, "You are trying to deploy the original repo. Please enter your forked repo link or kindly fuck off!");
    }

    const regex = /https?:\/\/github\.com\/(?:[^\/\s]+\/)+/g
    if (!regex.test(input)) {
        return throwError(true, "Please enter a github repo url!");
    }

    window.open(`https://heroku.com/deploy?template=${input}`, "_blank")
}

// Function to throw errors
function throwError(asAlert = false, alTxt = null) {
    if (asAlert) {
        alert(alTxt);
    } else {
        window.location = "deploy/oops.html";
    }
}


// Get the url parameters
let req = new URL(window.location.href);
var unr = req.searchParams.get("src");

validateSrc(unr)
setupForkButton()
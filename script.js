document.addEventListener("DOMContentLoaded", () => {
    // const fullName = localStorage.getItem("fullName"); // Retrieve user's full name
       
    const fullName = localStorage.getItem("fullName") || "User";
    const message = `Good evening, ${fullName}! Welcome to PECO LOGISTICS.`;
    
    document.getElementById("welcomeMessage").innerText = message;

    if (!fullName) {
        console.warn("No user name found in localStorage.");
        return;
    }

    // Get the current hour
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    // Display greeting and user name
//     const greetingElement = document.getElementById("greetingMessage");
//     if (greetingElement) {
//         greetingElement.innerText = `${greeting}, ${fullName}! Welcome to PECO CASH.`;
//     } else {
//         console.error("Greeting element not found in HTML.");
//     }
// });


});








function trackShipment() {
    let trackingNumber = document.getElementById("tracking-number").value;
    let resultBox = document.getElementById("tracking-result");

    if (trackingNumber.trim() === "") {
        resultBox.innerHTML = "Please enter a tracking number!";
        resultBox.style.color = "red";
        return;
    }

    // Simulated API Response (Replace with Real API)
    let response = {
        status: "In Transit",
        estimatedDelivery: "3 Days",
        location: "Paris, France"
    };

    resultBox.innerHTML = `
        <p><strong>Status:</strong> ${response.status}</p>
        <p><strong>Estimated Delivery:</strong> ${response.estimatedDelivery}</p>
        <p><strong>Current Location:</strong> ${response.location}</p>
    `;
    resultBox.style.color = "green";
}






document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            alert("You have been logged out.");
            window.location.href = "loginform.html"; // Redirect to login page
        });
    }
});







document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You need to log in first.");
        window.location.href = "loginform.html"; 
        return;
    }

    document.getElementById("viewProfileBtn").addEventListener("click", fetchProfile);
    document.getElementById("updateProfileBtn").addEventListener("click", updateProfile);
});

// Function to fetch and display user profile
async function fetchProfile() {
    const profileResponse = document.getElementById("profileResponse");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("https://onboarding-api-3.onrender.com/api/users/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            profileResponse.innerHTML = `
                <p><strong>Full Name:</strong> ${data.fullName}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phoneNumber}</p>
                <p><strong>Residence:</strong> ${data.placeOfResidence}</p>
                 <p><strong>Account Number:</strong> ${data.accounts.map(acc => `${acc.accountType}: ${acc.bankAccountNumber}`).join(", ")}</p>
            `;
            profileResponse.style.color = "black";
        } else {
            profileResponse.innerText = `Error: ${data.message}`;
            profileResponse.style.color = "red";
        }
    } catch (error) {
        console.error("Error:", error);
        profileResponse.innerText = "Failed to fetch profile.";
        profileResponse.style.color = "red";
    }
}

// Function to update user profile
async function updateProfile() {
    const token = localStorage.getItem("token");
    const fullName = prompt("Enter your full name:");
    const email = prompt("Enter your email:");
    const phone = prompt("Enter your phone number:");
    const placeOfResidence = prompt("Enter your place of residence:");

    if (!fullName || !email || !phone || !placeOfResidence) {
        alert("All fields are required.");
        return;
    }

    try {
        const response = await fetch("https://onboarding-api-3.onrender.com/api/user/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ fullName, email, phone, placeOfResidence })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Profile updated successfully!");
            fetchProfile(); // Refresh profile details
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to update profile.");
    }
}








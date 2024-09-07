function showOverviewPopup() {
    document.getElementById('popup-container').style.display = 'flex';
    document.getElementById('popup-content').style.display = 'block';
    document.getElementById('popup-superuser').style.display = 'none';
    document.getElementById('viewTT').style.display = 'none';
    document.getElementById('viewDta').style.display = 'none';
}

function ViewTotaltransac() {
    document.getElementById('popup-container').style.display = 'flex';
    document.getElementById('viewTT').style.display = 'block';
    document.getElementById('popup-content').style.display = 'none';

}

function SuperuserDataBase(){
    document.getElementById('popup-container').style.display = 'flex';
    document.getElementById('popup-superuser').style.display = 'block';
    document.getElementById('popup-content').style.display = 'none';

}

function ViewSuperuserData(){
    document.getElementById('popup-container').style.display = 'flex';
    document.getElementById('viewDta').style.display = 'block';
    document.getElementById('popup-superuser').style.display = 'none';

}

function closeBtn(){
    document.getElementById('popup-container').style.display = 'none';
    
}


function showViewForm() {
    document.getElementById("susu-form").style.display = "none"; 
    document.getElementById("View-form").style.display = "block"; 
}


function openPopup() {
    document.getElementById('userManagementPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'flex';
}

function closePopup() {
    document.getElementById('userManagementPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}


function openPopup() {
    const popup = document.getElementById("userManagementPopup");
    popup.style.display = "block";
}

function closePopup() {
    const popup = document.getElementById("userManagementPopup");
    popup.style.display = "none";
}

function confirRegis1() {
    const username = document.querySelector('#add-teller input[name="name"]').value;
    const branch = document.querySelector('#branch').value;
    const tellerType = document.querySelector('#Teller-type').value;
    const Passcode = document.querySelector('#add-teller input[name="Password"]').value;

    if (!username || branch === "null" || tellerType === "null" || !Passcode) {
        document.getElementById('errm1').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errm1').style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confirm1-username').textContent = username;
        document.querySelector('#confirm1-branch').textContent = branch;
        document.querySelector('#confirm1-teller-type').textContent = tellerType;

        document.getElementById('add-teller').style.display = 'none';
        document.getElementById('confirmRegistration1').style.display = 'block';
    }
}

async function submit1() {
    const form = document.getElementById('UserRegisteration');
    const formData = {
        name: form.name.value,
        usertype: form.usertype.value,
        branch: form.branch.value,
        tellertype: form.tellertype.value,
        Password: form.Password.value
    };

    const hideAllMessages = () => {
        document.getElementById('confirmRegistration1').style.display = 'none';
        document.getElementById('successful-sms').style.display = 'none';
        document.getElementById('failureM-sms').style.display = 'none';
        document.getElementById('failureU-sms').style.display = 'none';
        document.getElementById('failure-sms-delE').style.display = 'none';
        document.getElementById('successD-sms-delS').style.display = 'none';
        document.getElementById('failureTx-sms').style.display = 'none';
        document.getElementById('failure-sms').style.display = 'none';
    };

    const showErrorAndReset = (errorId) => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById(errorId).style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('confirmRegistration1').style.display = 'block';
        }, 5000);
    };

    hideAllMessages();
    document.getElementById('loader').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/UserRegisteration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (data.success) {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 2000);
            } else {
                switch (data.error) {
                    case 1:
                        showErrorAndReset('failureM-sms');
                        break;
                    case 2:
                        showErrorAndReset('failureTx-sms');
                        break;
                    case 3:
                        showErrorAndReset('failure-sms');
                        break;
                    default:
                        showErrorAndReset('failure-sms');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorAndReset('failure-sms');
        }
    }, 4000);
}

function Back1() {
    document.getElementById('confirmRegistration1').style.display = 'none';
    document.getElementById('add-teller').style.display = 'block';
}

function confirRegis2() {
    const username = document.querySelector('#add-users2 input[name="name"]').value;
    const Passcode = document.querySelector('#add-users2 input[name="Password"]').value;
    const usertype = document.querySelector('#user-type2').value;

    if (!username || !Passcode || usertype === "null") {
        document.getElementById('errm2').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errm2').style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confirm2-username').textContent = username;
        document.querySelector('#confirm2-userty').textContent = usertype;

        document.getElementById('add-users2').style.display = 'none';
        document.getElementById('confirmRegistration2').style.display = 'block';
    }
}

async function submit2() {
    const form = document.getElementById('UserRegisteration2');
    const formData = {
        name: form.name.value,
        usertype: form.usertype.value,
        branch: form.branch.value,
        tellertype: form.tellertype.value,
        Password: form.Password.value
    };

    const hideAllMessages = () => {
        document.getElementById('confirmRegistration2').style.display = 'none';
        document.getElementById('successful-sms').style.display = 'none';
        document.getElementById('failureM-sms').style.display = 'none';
        document.getElementById('failureU-sms').style.display = 'none';
        document.getElementById('failure-sms-delE').style.display = 'none';
        document.getElementById('successD-sms-delS').style.display = 'none';
        document.getElementById('failureTx-sms').style.display = 'none';
        document.getElementById('failure-sms').style.display = 'none';
    };

    const showErrorAndReset = (errorId) => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById(errorId).style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('confirmRegistration2').style.display = 'block';
        }, 5000);
    };

    hideAllMessages();
    document.getElementById('loader').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/UserRegisteration2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (data.success) {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('successful-sms').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 2000);
            } else {
                switch (data.error) {
                    case 1:
                        showErrorAndReset('failureM-sms');
                        break;
                    case 2:
                        showErrorAndReset('failureU-sms');
                        break;
                    case 3:
                        showErrorAndReset('failure-sms');
                        break;
                    default:
                        showErrorAndReset('failure-sms');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorAndReset('failure-sms');
        }
    }, 4000);
}

function Back2() {
    document.getElementById('confirmRegistration2').style.display = 'none';
    document.getElementById('add-users2').style.display = 'block';
}

function confirDel() {
    const username = document.querySelector('#delete-user input[name="Username"]').value;

    if (!username) {
        document.getElementById('errm3').style.display = 'block';
        setTimeout(() => {
            document.getElementById('errm3').style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confirm3-username').textContent = username;

        document.getElementById('delete-user').style.display = 'none';
        document.getElementById('confirmDelt').style.display = 'block';
    }
}

async function submit3() {
    const form = document.getElementById('UserDelete');
    const formData = {
        Username: form.Username.value,
    };

    const hideAllMessages = () => {
        document.getElementById('confirmDelt').style.display = 'none';
        document.getElementById('failure-sms-delE').style.display = 'none';
        document.getElementById('successD-sms-delS').style.display = 'none';
        document.getElementById('failure-sms').style.display = 'none';
    };

    const showErrorAndReset = (errorId) => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById(errorId).style.display = 'block';
        setTimeout(() => {
            hideAllMessages();
            document.getElementById('confirmDelt').style.display = 'block';
        }, 5000);
    };

    hideAllMessages();
    document.getElementById('loader').style.display = 'block';

    setTimeout(async () => {
        try {
            const response = await fetch('/DeleteUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (data.success) {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('successD-sms-delS').style.display = 'block';
                setTimeout(() => {
                    window.location.href = '/admin';
                }, 2000);
            } else {
                switch (data.error) {
                    case 1:
                        showErrorAndReset('failure-sms-delE');
                        break;
                    case 2:
                        showErrorAndReset('failure-sms');
                        break;
                    default:
                        showErrorAndReset('failure-sms');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorAndReset('failure-sms');
        }
    }, 4000);
}

function Back3() {
    document.getElementById('confirmDelt').style.display = 'none';
    document.getElementById('delete-user').style.display = 'block';
}

// Function to view the number of users
function viewUsers() {
    fetch('/users/count')
        .then(response => response.text())
        .then(data => alert(`Number of users: ${data}`))
        .catch(error => console.error('Error:', error));
}

// Function to add a new teller
function addteller() {
    document.getElementById('adduser-backgrd').style.display = 'flex';
    document.getElementById('add-teller').style.display = 'block'; 
    document.getElementById('userManagementPopup').style.display = 'none';
    document.getElementById('add-users2').style.display = 'none';
    document.getElementById('delete-user').style.display = 'none';
    document.getElementById('confirmRegistration2').style.display = 'none';
    document.getElementById('confirmRegistration1').style.display = 'none';
    document.getElementById('confirmDelt').style.display = 'none';
}

// Function to add a new user
function addUser2() {
    document.getElementById('adduser-backgrd').style.display = 'flex';
    document.getElementById('add-users2').style.display = 'block';
    document.getElementById('userManagementPopup').style.display = 'none';
    document.getElementById('delete-user').style.display = 'none';
    document.getElementById('add-teller').style.display = 'none';
    document.getElementById('confirmRegistration2').style.display = 'none';
    document.getElementById('confirmRegistration1').style.display = 'none'; 
    document.getElementById('confirmDelt').style.display = 'none';  
}

// Function to delete a user
function deleteUser()  {
    document.getElementById('adduser-backgrd').style.display = 'flex';
    document.getElementById('delete-user').style.display = 'block';
    document.getElementById('userManagementPopup').style.display = 'none';
    document.getElementById('add-teller').style.display = 'none';
    document.getElementById('add-users2').style.display = 'none';
    document.getElementById('confirmRegistration2').style.display = 'none';
    document.getElementById('confirmRegistration1').style.display = 'none'; 
    document.getElementById('confirmDelt').style.display = 'none';
}

function closeadduserBtn() {
    const popup = document.getElementById("adduser-backgrd");
    popup.style.display = "none";
}

document.getElementById('transactionMonitoring').addEventListener('click', function () {
    document.getElementById('popup-TM').style.display = 'block';

    var barChartData = {
        labels: ['MOMO', 'ECOBANK', 'FIDELITY','CALBANK'],
        datasets: [{
            label: 'Number of Customers',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [100, 71, 55, 12]
        }]
    };

    var pieChartData = {
        labels: ['MOMO', 'ECOBANK', 'FIDELITY','CALBANK'],
        datasets: [{
            label: 'Number of Money sent to customers GHC',
            data: [50000, 40000, 22000,10000],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)','rgba(218, 165, 32, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)','rgba(218, 165, 32, 1)'],
            borderWidth: 1
        }]
    };

    var barChart = new Chart(document.getElementById('barChart').getContext('2d'), {
        type: 'bar',
        data: barChartData
    });

    var pieChart = new Chart(document.getElementById('pieChart').getContext('2d'), {
        type: 'pie',
        data: pieChartData
    });
});

document.getElementById('close-popupTM').addEventListener('click', function () {
    document.getElementById('popup-TM').style.display = 'none';
});



  
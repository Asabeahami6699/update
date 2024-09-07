
function showAUTB(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('TB-form').style.display = 'block';
}

function showVATWD(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('TW-form').style.display = 'block';
}

function AiyinaseT(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('TB-form').style.display = 'none';
    document.getElementById('ATB-form').style.display = 'block';
}

function BogosoT(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('TB-form').style.display = 'none';
    document.getElementById('BTB-form').style.display = 'block';
}

function PresteaT(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('TB-form').style.display = 'none';
    document.getElementById('PTB-form').style.display = 'block';
}

function TandSbalancing(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('TandS-form').style.display = 'block';
}

function XportAllDocs(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('XportAllDocs-form').style.display = 'block';
}

function Download1(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('XportAllDocs-form').style.display = 'none';
    document.getElementById('XportAllDocs-form2').style.display = 'block';
}

function Download2(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('XportAllDocs-form').style.display = 'none';
    document.getElementById('XportAllDocs-form1').style.display = 'block';
}

function Download3(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('XportAllDocs-form').style.display = 'none';
    document.getElementById('XportAllDocs-form3').style.display = 'block';
}

function Sbalancing(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('SuperuserBlc-form').style.display = 'block';
}

function ForInvites(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('SuperuserMore-form').style.display = 'block';
}

function mcb(){
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('mcb-form').style.display = 'block';
}

function deleteDocs(){
    document.getElementById('SuperuserMore-form').style.display = 'none';
    document.getElementById('deleteDocs-form').style.display = 'block';
}

function DeleteBMS(){
    document.getElementById('deleteDocs-form').style.display = 'none';
    document.getElementById('BMSdelete-form').style.display = 'block';
}

function DeleteOtherWithdrawal(){
    document.getElementById('deleteDocs-form').style.display = 'none';
    document.getElementById('OtherWithdlsDel-form').style.display = 'block';
}

function deleteBMSConfir() {
    document.getElementById('filldelsms').style.display = 'none';

    const date = document.querySelector('#BMSdelete-form input[name="date"]').value;
    const branch = document.querySelector('#Dbranch').value;
    const teller = document.querySelector('#DTeller-type').value;
    const transaction = document.querySelector('#Transaction-type').value;
    const description = document.querySelector('#description-type').value;
    const transNumber = document.querySelector('#BMSdelete-form input[name="TransNumber"]').value;
    const amount = document.querySelector('#BMSdelete-form input[name="amount"]').value;

    if (description === 'choose' || branch === 'null' || teller === 'null' ||
        transaction === 'choose' || !date || !amount || !transNumber) {
        document.getElementById('filldelsms').style.display = 'block';
        setTimeout(() => {
            document.getElementById('filldelsms').style.display = 'none';
        }, 3000);
    } else {
        document.querySelector('#confir-Ddate1').textContent = date;
        document.querySelector('#confir-Db1').textContent = branch;
        document.querySelector('#confir-Dt1').textContent = teller;
        document.querySelector('#confir-DTrtyp1').textContent = transaction;
        document.querySelector('#confir-Ddesc1').textContent = description;
        document.querySelector('#confir-DTnumb1').textContent = transNumber;
        document.querySelector('#confir-Damt1').textContent = amount;
    
        document.getElementById('BMSdelete-form').style.display = "none";
        document.getElementById('Delete-form1').style.display = "block";
    }
}

function BackD1(){
    document.getElementById('Delete-form1').style.display = 'none';
    document.getElementById('BMSdelete-form').style.display = 'block';
}

function confirSubmitDel1() {
    const formData = {
        branch: document.getElementById('Dbranch').value,
        tellertype: document.getElementById('DTeller-type').value,
        Transaction: document.getElementById('Transaction-type').value,
        description: document.getElementById('description-type').value,
        TransNumber: document.querySelector('input[name="TransNumber"]').value,
        amount: document.querySelector('input[name="amount"]').value,
        date: document.querySelector('input[name="date"]').value,
    };

    fetch('/DeleteDoc1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.success);
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showOtherWithdDelForm() {
    document.getElementById('deleteSms2').style.display = 'none';

    const date = document.querySelector('#otherWithDel input[name="dateOd"]').value;
    const branch = document.querySelector('#Dbranch2').value;
    const teller = document.querySelector('#DTeller-type2').value;
    const withdrawalType = document.querySelector('#withdrawal-del').value;
    const beneficialName = document.querySelector('#otherWithDel input[name="Odname"]').value.trim();
    const amount = document.querySelector('#otherWithDel input[name="Odamount"]').value;

    if (withdrawalType === 'choose' || branch === 'null' || teller === 'null' ||
        !date || !beneficialName || !amount) {
        document.getElementById('deleteSms2').style.display = 'block';
        setTimeout(() => {
            document.getElementById('deleteSms2').style.display = 'none';
        }, 3000);
    } else {
        document.querySelector('#confir-time-del').textContent = date;
        document.querySelector('#confirm-withd-br').textContent = branch;
        document.querySelector('#confirm-withd-tlr').textContent = teller;
        document.querySelector('#confirm-withd-del').textContent = withdrawalType;
        document.querySelector('#confirm-name-del').textContent = beneficialName;
        document.querySelector('#confirm-amt-del').textContent = amount;
    
        document.getElementById('OtherWithdlsDel-form').style.display = "none";
        document.getElementById('confirDel-form').style.display = "block";
    }
}

function BackodD() {
    document.getElementById("confirDel-form").style.display = "none";
    document.getElementById("OtherWithdlsDel-form").style.display = "block";
}

function submitOtherWithdDelete() {
    const formData = {
        branch: document.getElementById('Dbranch2').value,
        tellertype: document.getElementById('DTeller-type2').value,
        withdrawalType: document.getElementById('withdrawal-del').value,
        Odname: document.querySelector('input[name="Odname"]').value.trim(),
        Odamount: document.querySelector('input[name="Odamount"]').value,
        dateOd: document.querySelector('input[name="dateOd"]').value,
    };

    fetch('/deleteOtherWithdrawal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.success);
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function DeleteUserInput() {
    document.getElementById("deleteDocs-form").style.display = "none";
    document.getElementById("UIdelete-form").style.display = "block";
}

function UserIpConfir() {
    document.getElementById('filldelsms2').style.display = 'none';

    const username = document.querySelector('input[name="Tusername"]').value;
    const userInput = document.querySelector('#userInput-type').value;
    const amount = document.querySelector('input[name="Inpamt"]').value;
    const date = document.querySelector('input[name="Ipdate"]').value;

    if (!username || userInput === 'choose' || !amount || !date) {
        document.getElementById('filldelsms2').style.display = 'block';
        setTimeout(() => {
            document.getElementById('filldelsms2').style.display = 'none';
        }, 3000);
    } else {
        document.getElementById('confir-Ip1').textContent = username;
        document.getElementById('confir-Ip2').textContent = userInput;
        document.getElementById('confir-Ip3').textContent = amount;
        document.getElementById('confir-Ip4').textContent = date;

        document.getElementById('UIdelete-form').style.display = "none";
        document.getElementById('confIpDel-form').style.display = "block";
    }
}

function BackIp() {
    document.getElementById("confIpDel-form").style.display = "none";
    document.getElementById("UIdelete-form").style.display = "block";
}

function UserIpSubmit() {
    const Name = document.querySelector('input[name="Tusername"]').value;
    const TheType = document.querySelector('#userInput-type').value;
    const InputAmount = document.querySelector('input[name="Inpamt"]').value;
    const date = document.querySelector('input[name="Ipdate"]').value;

    const formData = {
        Name,
        TheType,
        InputAmount,
        date
    };

    fetch('/deleteUserInput', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.success);
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function hideForm() {

    document.getElementById('overlay').style.display = 'none';

    var forms = document.querySelectorAll('.popup-form');
    forms.forEach(function(form) {
        form.style.display = 'none';
    });
}
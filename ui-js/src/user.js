function showForm(formId) {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById(formId).style.display = 'block';
}

function showViewForm() {
    document.getElementById("susudnv-form").style.display = "none"; 
    document.getElementById("View-form").style.display = "block"; 
}

function UserInputDataForm() {
    document.getElementById("choose").style.display = "none"; 
    document.getElementById("user-input-form").style.display = "block"; 
}

function MPaymentForm() {
    const elementsToHide = ["choose", "comm-description-momo", "cd1", "comm-momo", "cml1", "lr1", "r1"];
    elementsToHide.forEach(id => document.getElementById(id).style.display = "none");
    document.getElementById("Mpayment-form").style.display = "block"; 
}

function hideFormAndShowChoose(formId) {
    document.getElementById(formId).style.display = "none";
    document.getElementById("choose").style.display = "block";
}

function MomoBack() { hideFormAndShowChoose("Mpayment-form"); }
function bankBack() { hideFormAndShowChoose("Bpayment-form"); }
function owlBack() { hideFormAndShowChoose("OtherWithdls-form"); }
function susuBack() { hideFormAndShowChoose("Susutransc-form"); }
function userBack() { hideFormAndShowChoose("user-input-form"); }

function BPaymentForm() {
    document.getElementById("choose").style.display = "none"; 
    document.getElementById("Bpayment-form").style.display = "block"; 
}

function ShowWithDashbd() {
    document.getElementById("Withdrawal-form").style.display = "none"; 
    document.getElementById("Withdrawal-dashbd").style.display = "block"; 
}

function ShowWithdlOthers() {
    document.getElementById("choose").style.display = "none"; 
    document.getElementById("OtherWithdls-form").style.display = "block"; 
}

function SPaymentForm() {
    document.getElementById("choose").style.display = "none"; 
    document.getElementById("Susutransc-form").style.display = "block"; 
}

function TBalanceForm() {
    document.getElementById("settings-form").style.display = "none"; 
    document.getElementById("Tbalance").style.display = "block"; 
}

function showConfirmationForm(){
    document.getElementById('errorSms4').style.display = 'none';

    const bankType = document.querySelector('#bank-type').value;
    const description = document.querySelector('#description-type').value;
    const accountNumber = document.querySelector('input[name="AccountNumber"]').value;
    const name = document.querySelector('input[name="Bname"]').value;
    const amount = document.querySelector('input[name="amount"]').value;
    const commission = document.querySelector('input[name="Commission"]').value;

    if (bankType === 'choose' || description === 'choose' || !accountNumber || !name || !amount || !commission) {
        document.getElementById('errorSms4').style.display = 'block';
        setTimeout(() => {
            errorSms4.style.display = 'none';
        }, 2000);
    } else {
    document.querySelector('#confirm-bank-type').textContent = bankType;
    document.querySelector('#confirm-description').textContent = description;
    document.querySelector('#confirm-account-number').textContent = accountNumber;
    document.querySelector('#confirm-name').textContent = name;
    document.querySelector('#confirm-amount').textContent = amount;
    document.querySelector('#confirm-commission').textContent = commission;

    document.getElementById('Bpayment-form').style.display = "none";
    document.getElementById('confirmation-form1').style.display = "block";
    }

}

function confirmAndSubmit() {
    const form = document.getElementById('BpaymentForm');
    const formData = {
        BankType: form.BankType.value,
        description: form.description.value,
        AccountNumber: form.AccountNumber.value,
        Bname: form.Bname.value,
        Commission: form.Commission.value,
        amount: form.amount.value
    };

    document.getElementById('confirmation-form1').style.display = 'none';
    document.getElementById('successful-sms').style.display = 'none'; 
    document.getElementById('failure-sms').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1300);

    fetch('/Userbpayment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('loading').style.display = 'none';
        if (data.success) {
            document.getElementById('loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successful-sms').style.display = 'block';
            }, 1300);
            setTimeout(() => {
                window.location.href = '/user';
            }, 3000)
        } else {
            document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confirmation-form1').style.display = 'block';
        },  5000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confirmation-form1').style.display = 'block';
        },  5000);
    });
}

function Back1() {
    document.getElementById('confirmation-form1').style.display = "none";
    document.getElementById('Bpayment-form').style.display = "block";
}

function showOtherWithdrawalConfirmationForm() {
    document.getElementById('errorSms3').style.display = 'none';

    const withdrawalType = document.querySelector('#withdrawal-type').value;
    const name = document.querySelector('#OtherWithdls-form input[name="Bname"]').value;
    const amount = document.querySelector('#OtherWithdls-form input[name="amount"]').value;

    if ( withdrawalType === 'choose' || !name || !amount) {
        document.getElementById('errorSms3').style.display = 'block';
        setTimeout(() => {
            errorSms3.style.display = 'none';
        }, 3000);
    } else {
        document.querySelector('#confirm-withdrawal-type').textContent = withdrawalType;
        document.querySelector('#confirm-other-name').textContent = name;
        document.querySelector('#confirm-other-amount').textContent = amount;
    
        document.getElementById('OtherWithdls-form').style.display = "none";
        document.getElementById('confirmation-form2').style.display = "block";
    }
}

function submitOtherWithdrawalForm() {
    const form = document.getElementById('otherWithdrawalForm');
    const formData = {
        withdrawalType: form.withdrawalType.value,
        Bname: form.Bname.value,
        amount: form.amount.value
    };

    document.getElementById('confirmation-form2').style.display = 'none';
    document.getElementById('successful-sms').style.display = 'none'; 
    document.getElementById('failure-sms').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1300);

    fetch('/UserOtherTrans', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('loading').style.display = 'none';
        if (data.success) {
            document.getElementById('loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successful-sms').style.display = 'block';
            }, 1300);
            setTimeout(() => {
                window.location.href = '/user';
            }, 3000);
        } else {
            document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confirmation-form2').style.display = 'block';
            },  5000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('failure-sms').style.display = 'block';
        setTimeout(() => {
             document.getElementById('failure-sms').style.display = 'none';
        }, 5000);
            document.getElementById('loading').style.display = 'none';
        setTimeout(() => {
                document.getElementById('confirmation-form2').style.display = 'block';
        },  5000);
    });
}

function Back2() {
    document.getElementById('confirmation-form2').style.display = "none";
    document.getElementById('OtherWithdls-form').style.display = "block";
}

function showSusuConfirmationForm() {
    document.getElementById('errorSms2').style.display = 'none';

    const name = document.querySelector('#Susutransc-form input[name="name"]').value;
    const description = document.querySelector('#susu-description-type').value;
    const accountNumber = document.querySelector('#Susutransc-form input[name="AccountNumber"]').value;
    const amount = document.querySelector('#Susutransc-form input[name="amount"]').value;

    if ( description === 'choose' || !name || !amount) {
        document.getElementById('errorSms2').style.display = 'block';
        setTimeout(() => {
            errorSms2.style.display = 'none';
        }, 3000);
    } else {
        document.querySelector('#confirm-susu-name').textContent = name;
        document.querySelector('#confirm-susu-description').textContent = description;
        document.querySelector('#confirm-susu-account-number').textContent = accountNumber;
        document.querySelector('#confirm-susu-amount').textContent = amount;
    
        document.getElementById('Susutransc-form').style.display = "none";
        document.getElementById('confirmation-form3').style.display = "block";
    }
}

function submitSusuTransForm() {
    const form = document.getElementById('susuTransForm');
    const formData = {
        description: form.description.value,
        name: form.name.value,
        amount: form.amount.value,
        AccountNumber: form.AccountNumber.value
    };

    document.getElementById('confirmation-form3').style.display = 'none';
    document.getElementById('successful-sms').style.display = 'none'; 
    document.getElementById('failure-sms').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1300);

    fetch('/susutransform', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('loading').style.display = 'none';
        if (data.success) {
            document.getElementById('loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successful-sms').style.display = 'block';
            }, 1300);
            setTimeout(() => {
                window.location.href = '/user';
            }, 3000); 
        } else {
            document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confirmation-form3').style.display = 'block';
            },  5000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('failure-sms').style.display = 'block';
        setTimeout(() => {
            document.getElementById('failure-sms').style.display = 'none';
        }, 5000);
        document.getElementById('loading').style.display = 'none';
        setTimeout(() => {
                document.getElementById('confirmation-form3').style.display = 'block';
        }, 5000);
    });
}

function Back3() {
    document.getElementById('confirmation-form3').style.display = "none";
    document.getElementById('Susutransc-form').style.display = "block";
}

function UserInputsConfirmationForm(formNumber) {
    let confirmationContent = '';
    let form;
    let errorMessageId;
    let formData = {};

    switch(formNumber) {
        case 1:
            form = document.getElementById('Uform1');
            errorMessageId = 'error-messageIPC';
            formData = {
                TranscType: form.querySelector('input[name="TranscType"]').value,
                openb: form.querySelector('select[name="openb"]').value,
                Intialamount: form.querySelector('input[name="Intialamount"]').value
            };
            confirmationContent = `
                <p>Initial Physical Cash Amount: GHC ${formData.Intialamount}</p>
            `;
            break;
        case 2:
            form = document.getElementById('Uform2');
            errorMessageId = 'error-messagePCC';
            formData = {
                TranscdType: form.querySelector('input[name="TranscdType"]').value,
                deposit: form.querySelector('select[name="deposit"]').value,
                depositedamount: form.querySelector('input[name="depositedamount"]').value
            };
            confirmationContent = `
                <p>Physical Cash Collected Amount: GHC ${formData.depositedamount}</p>
            `;
            break;
        case 3:
            form = document.getElementById('Uform3');
            errorMessageId = 'error-messageECP';
            formData = {
                selt: form.querySelector('select[name="selt"]').value,
                factor: form.querySelector('input[name="factor"]').value,
                amount: form.querySelector('input[name="amount"]').value
            };
            confirmationContent = `
                <p>Title: ${formData.selt}</p>
                <p>Description: ${formData.factor}</p>
                <p>Amount: GHC ${formData.amount}</p>
            `;
            break;
        default:
            return;
    }

    const inputs = form.querySelectorAll('input, select');
    let allFieldsFilled = true;

    inputs.forEach(input => {
        if (!input.value || input.value === 'choose') {
            allFieldsFilled = false;
        }
    });

    if (!allFieldsFilled) {
        const errorMessage = document.getElementById(errorMessageId);
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000); 
    } else {
        document.getElementById('confirmation-content').innerHTML = confirmationContent;
        document.getElementById('user-input-form').style.display = 'none';
        document.getElementById('confirmation-form4').style.display = 'block';

        document.getElementById('confirm-UI').onclick = function() {
            submitForm(formNumber, formData);
        };
    }
}

function submitForm(formNumber, formData) {
    let url;
    switch(formNumber) {
        case 1:
            url = '/UserInputs1';
            break;
        case 2:
            url = '/UserInputs2';
            break;
        case 3:
            url = '/UserInputs3';
            break;
        default:
            return;
    }

    document.getElementById('confirmation-form4').style.display = 'none';
    document.getElementById('successful-sms').style.display = 'none'; 
    document.getElementById('failure-sms').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1300);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('loading').style.display = 'none';
        if (data.success) {
            document.getElementById('loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successful-sms').style.display = 'block';
            }, 1300);
            setTimeout(() => {
                window.location.href = '/user';
            }, 3000);
        } else {
            document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confirmation-form4').style.display = 'block';
            }, 5000); 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('failure-sms').style.display = 'block';
        setTimeout(() => {
            document.getElementById('failure-sms').style.display = 'none';
        }, 5000);
        document.getElementById('loading').style.display = 'none';
        setTimeout(() => {
            document.getElementById('confirmation-form4').style.display = 'block';
        }, 5000);
    });
}

function Back4() {
    document.getElementById('confirmation-form4').style.display = "none";
    document.getElementById('user-input-form').style.display = "block";
}

function showMoMoConfirmationForm() {
    const errorSms = document.getElementById('errorSms1');
    errorSms.style.display = 'none';
    const momoType = document.querySelector('#momo').value;
    const description = document.querySelector('#description-type-momo').value;
    const momoNumber = document.querySelector('#Mpayment-form input[name="momonumber"]').value;
    const name = document.querySelector('#Mpayment-form input[name="Bname"]').value;
    const amount = document.querySelector('#Mpayment-form input[name="amount"]').value;
    const commission = document.querySelector('#Mpayment-form input[name="Commission"]').value;
    const commDescription = document.querySelector('#comm-description-momo').value;
    const commReason = document.querySelector('#Mpayment-form input[name="R1name"]').value;

    if ([momoType, description, momoNumber, name, amount, commission].includes('') || momoType === 'choose' || description === 'choose') {
        errorSms.style.display = 'block';
        setTimeout(() => {
            errorSms.style.display = 'none';
        }, 3000);
        return;
    }

    document.querySelector('#confirm-momo-type').textContent = momoType;
    document.querySelector('#confirm-momo-description').textContent = description;
    document.querySelector('#confirm-momo-number').textContent = momoNumber;
    document.querySelector('#confirm-momo-name').textContent = name;
    document.querySelector('#confirm-momo-amount').textContent = amount;
    document.querySelector('#conf-mm-comm-desc').textContent = commDescription;
    document.querySelector('#conf-mm-comm-rsn').textContent = commReason;
    document.querySelector('#confirm-momo-commission').textContent = commission;

    document.getElementById('Mpayment-form').style.display = 'none';
    document.getElementById('confirmation-form5').style.display = 'block';
}

function submitMoMoPaymentForm() {
    const form = document.getElementById('momoPaymentForm');
    const formData = {
        MoMo: form.MoMo.value,
        description: form.description.value,
        momonumber: form.momonumber.value,
        Bname: form.Bname.value,
        amount: form.amount.value,
        Commission: form.Commission.value,
        commDescMm: form.commDescMm.value,
        R1name: form.R1name.value
    };
    
    document.getElementById('confirmation-form5').style.display = 'none';
    document.getElementById('successful-sms').style.display = 'none'; 
    document.getElementById('failure-sms').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1300);

    fetch('/Usermpayment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('loading').style.display = 'none';
        if (data.success) {
            document.getElementById('loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successful-sms').style.display = 'block';
            }, 1300);
            setTimeout(() => {
                window.location.href = '/user'; 
            }, 3000);
        } else {
            document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confirmation-form5').style.display = 'block';
            },  5000);
        }       
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('failure-sms').style.display = 'block';
        setTimeout(() => {
            document.getElementById('failure-sms').style.display = 'none';
        }, 5000);
        document.getElementById('loading').style.display = 'none';
        setTimeout(() => {
            document.getElementById('confirmation-form5').style.display = 'block';
        },  5000);
    });
}

function Back5() {
    document.getElementById('confirmation-form5').style.display = "none";
    document.getElementById('Mpayment-form').style.display = "block";
}

function hideForm() {

    document.getElementById('overlay').style.display = 'none';

    var forms = document.querySelectorAll('.popup-form');
    forms.forEach(function(form) {
        form.style.display = 'none';
    });
}


        // function for user calculator
        function calculateTotal() {
            const note200 = document.getElementById('note200').value * 200;
            const note100 = document.getElementById('note100').value * 100;
            const note50 = document.getElementById('note50').value * 50;
            const note20 = document.getElementById('note20').value * 20;
            const note10 = document.getElementById('note10').value * 10;
            const note5 = document.getElementById('note5').value * 5;
            const note2 = document.getElementById('note2').value * 2;
            const note1 = document.getElementById('note1').value * 1;
            const coin50 = document.getElementById('coin50').value * 0.50;
            const coin20 = document.getElementById('coin20').value * 0.20;
            const coin10 = document.getElementById('coin10').value * 0.10;
        
            document.getElementById('total200').innerText =  + note200.toFixed(2);
            document.getElementById('total100').innerText = '' + note100.toFixed(2);
            document.getElementById('total50').innerText = ' ' + note50.toFixed(2);
            document.getElementById('total20').innerText = ' ' + note20.toFixed(2);
            document.getElementById('total10').innerText = ' ' + note10.toFixed(2);
            document.getElementById('total5').innerText = ' ' + note5.toFixed(2);
            document.getElementById('total2').innerText = ' ' + note2.toFixed(2);
            document.getElementById('total1').innerText = ' ' + note1.toFixed(2);
            document.getElementById('totalCoin50').innerText = ' ' + coin50.toFixed(2);
            document.getElementById('totalCoin20').innerText = ' ' + coin20.toFixed(2);
            document.getElementById('totalCoin10').innerText = ' ' + coin10.toFixed(2);
        
            const grandTotal = note200 + note100 + note50 + note20 + note10 + note5 + note2 + note1 + coin50 + coin20 + coin10;
            document.getElementById('grandTotal').innerText = 'GHS ' + grandTotal.toFixed(2);
        }
        
        function clearInputs() {
            document.querySelectorAll('input[type="number"]').forEach(input => input.value = 0);
            document.querySelectorAll('td[id^="total"]').forEach(td => td.innerText = ' 0.00');
            document.getElementById('grandTotal').innerText = 'GHS 0.00';
        }
        function copyGrandTotal() {
            const grandTotalElement = document.getElementById('grandTotal');
            const grandTotalText = grandTotalElement.innerText;
        
            // Extract numerical part (assuming it always starts after 'GHS ')
            const numericValue = grandTotalText.replace('GHS ', '');
        
            // Create a temporary input to hold the text
            const tempInput = document.createElement('input');
            tempInput.value = numericValue;
        
            // Append the input to the body
            document.body.appendChild(tempInput);
        
            // Select and copy the text inside the input field
            tempInput.select();
            tempInput.setSelectionRange(0, 99999); // For mobile devices
            document.execCommand("copy");
        
            // Remove the temporary input
            document.body.removeChild(tempInput);
        
            // Change the text to 'Copied!'
            grandTotalElement.innerText = "Copied!";
        
            // Revert the text back to the grand total value after 2 seconds
            setTimeout(() => {
                grandTotalElement.innerText = grandTotalText;
            }, 2000);
        }
        

  


  
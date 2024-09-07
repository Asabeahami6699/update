function showForm(formId) {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById(formId).style.display = 'block';
}

function UserInputDataForm() {
    document.getElementById("choose-menu").style.display = "none"; 
    document.getElementById("user-input-form").style.display = "block"; 
}

function ShowDataBaseForm() {
    document.getElementById("settings-form").style.display = "none"; 
    document.getElementById("data-form").style.display = "block"; 
}

function AllPaymentForm() {
    document.getElementById("choose-menu").style.display = "none"; 
    document.getElementById("AllPayment-form").style.display = "block"; 
}

function OtherEntries() {
    document.getElementById("user-input-form").style.display = "none"; 
    document.getElementById("OtherEntries-form").style.display = "block"; 
}

function Confir1() {
    document.getElementById('err1').style.display = 'none';

    const Type = document.querySelector('#T-type').value;
    const branch = document.querySelector('#branch').value;
    const Teller = document.querySelector('#tell').value;
    const Amount = document.querySelector('#AllPayment-form input[name="amount"]').value;

    if (Type === 'null' || branch === 'null' || Teller === 'tel' || !Amount) {
        document.getElementById('err1').style.display = 'block';
        setTimeout(() => {
            document.getElementById('err1').style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confir1-type').textContent = Type;
        document.querySelector('#confir1-brh').textContent = branch;
        document.querySelector('#confir1-tll').textContent = Teller;
        document.querySelector('#confir1-amt').textContent = Amount;

        document.getElementById('AllPayment-form').style.display = 'none';
        document.getElementById('confir1').style.display = 'block';
    }
}

function submitConfi1() {
    const form = document.getElementById('Sform1');
    const formData = {
        TransType: form.TransType.value,
        branch: form.branch.value,
        teller: form.teller.value,
        amount: form.amount.value
    };

    document.getElementById('confir1').style.display = 'none';
    document.getElementById('successful-sms').style.display = 'none'; 
    document.getElementById('failure-sms').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1300);

    fetch('/Spayment', {
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
    .then(data=> {
        document.getElementById('loading').style.display = 'none';
        if (data.success) {
            document.getElementById('loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successful-sms').style.display = 'block';
            }, 1300);
            setTimeout(() => {
                window.location.href = '/superuser';
            }, 3000); 
        } else {
            document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confir1').style.display = 'block';
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
                document.getElementById('confir1').style.display = 'block';
        },  5000);
    });
}

function Back1() {
    document.getElementById('confir1').style.display = "none";
    document.getElementById('AllPayment-form').style.display = "block";
}

function confir2() {
    document.getElementById('err2').style.display = 'none';

    const P_Type = document.querySelector('#payment-type1').value;
    const Amount = document.querySelector('#user-input-form input[name="openAmt"]').value;
    const Type = document.querySelector('#open').value;

    if (P_Type === 'null' ||Type === ' ' || !Amount) {
        document.getElementById('err2').style.display = 'block';
        setTimeout(() => {
            document.getElementById('err2').style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confir2-type').textContent = P_Type;
        document.querySelector('#confir2-ty').textContent = Type;
        document.querySelector('#confir2-amt').textContent = Amount;

        document.getElementById('user-input-form').style.display = 'none';
        document.getElementById('confir2').style.display = 'block';
    }
}

function submitConfi2() {
    const form = document.getElementById('Sform2');
    const formData = {
        paymenttype: form.paymenttype.value,
        openb: form.openb.value,
        openAmt: form.openAmt.value,
    };

    document.getElementById('confir2').style.display = 'none';
    document.getElementById('successful-sms').style.display = 'none'; 
    document.getElementById('failure-sms').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1300);
    

    fetch('/SuperuserInput1', {
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
    .then(data=> {
        document.getElementById('loading').style.display = 'none';
        if (data.success) {
            document.getElementById('loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successful-sms').style.display = 'block';
            }, 1300);
            setTimeout(() => {
                window.location.href = '/superuser';
            }, 3000)
        } else {
            document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confir2').style.display = 'block';
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
            document.getElementById('confir2').style.display = 'block';
    },  5000);
    });
}

function Back2() {
    document.getElementById('confir2').style.display = "none";
    document.getElementById('user-input-form').style.display = "block";
}

function confir3() {
    document.getElementById('err3').style.display = 'none';

    const P_Type = document.querySelector('#payment-type2').value;
    const Amount = document.querySelector('#user-input-form input[name="depositedAmount"]').value;
    const Type = document.querySelector('#depo').value;

    if (P_Type === 'null' ||Type === ' ' || !Amount) {
        document.getElementById('err3').style.display = 'block';
        setTimeout(() => {
            document.getElementById('err3').style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confir3-type').textContent = P_Type;
        document.querySelector('#confir3-ty').textContent = Type;
        document.querySelector('#confir3-amt').textContent = Amount;

        document.getElementById('user-input-form').style.display = 'none';
        document.getElementById('confir3').style.display = 'block';
    }
}

function submitConfi3() {
    const form = document.getElementById('Sform3');
    const formData = {
        paymenttype: form.paymenttype.value,
        deposits: form.deposits.value,
        depositedAmount: form.depositedAmount.value,
    };

    document.getElementById('confir3').style.display = 'none';
    document.getElementById('successful-sms').style.display = 'none'; 
    document.getElementById('failure-sms').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1300);
    

    fetch('/SuperuserInput2', {
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
    .then(data=> {
        document.getElementById('loading').style.display = 'none';
        if (data.success) {
            document.getElementById('loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successful-sms').style.display = 'block';
            }, 1300);
            setTimeout(() => {
                window.location.href = '/superuser';
            }, 3000)
        } else {
            document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confir3').style.display = 'block';
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
                document.getElementById('confir3').style.display = 'block';
        }, 5000);
    });
}

function Back3() {
    document.getElementById('confir3').style.display = "none";
    document.getElementById('user-input-form').style.display = "block";
}

function confir4() {
    document.getElementById('err4').style.display = 'none';

    const Branch = document.querySelector('#branch2').value;
    const Amount = document.querySelector('#user-input-form input[name="CommAmt"]').value;
    const Teller_type = document.querySelector('#teller2').value;
    const Type = document.querySelector('#com-typ').value;

    if (Branch === 'null' ||Teller_type === 'null' || !Amount ||Type === 'null') {
        document.getElementById('err4').style.display = 'block';
        setTimeout(() => {
            document.getElementById('err4').style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confir4-brch').textContent = Branch;
        document.querySelector('#confir4-tt').textContent = Teller_type;
        document.querySelector('#confir4-typ').textContent = Type;
        document.querySelector('#confir4-amt').textContent = Amount;

        document.getElementById('user-input-form').style.display = 'none';
        document.getElementById('confir4').style.display = 'block';
    }
}

function submitConfi4() {
    const form = document.getElementById('Sform4');
    const formData = {
        branch: form.branch.value,
        teller: form.teller.value,
        Commissions: form.Commissions.value,
        CommAmt: form.CommAmt.value,
    };

    document.getElementById('confir4').style.display = 'none';
    document.getElementById('successful-sms').style.display = 'none'; 
    document.getElementById('failure-sms').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1300);
    

    fetch('/SuperuserInput3', {
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
    .then(data=> {
        document.getElementById('loading').style.display = 'none';
        if (data.success) {
            document.getElementById('loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successful-sms').style.display = 'block';
            }, 1300);
            setTimeout(() => {
                window.location.href = '/superuser';
            }, 3000)
        } else {
            document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confir4').style.display = 'block';
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
                document.getElementById('confir4').style.display = 'block';
        }, 5000);
    });
}

function Back4() {
    document.getElementById('confir4').style.display = "none";
    document.getElementById('user-input-form').style.display = "block";
}

function confir5() {
    document.getElementById('err5').style.display = 'none';

    const P_type = document.querySelector('#payment-type3').value;
    const Amount = document.querySelector('#OtherEntries-form input[name="EntryAmt"]').value;
    const Type = document.querySelector('#entrs').value;

    if (P_type === 'null' ||!Amount) {
        document.getElementById('err5').style.display = 'block';
        setTimeout(() => {
            document.getElementById('err5').style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confir5-entr').textContent = P_type;
        document.querySelector('#confir5-typ').textContent = Type;
        document.querySelector('#confir5-amt').textContent = Amount;

        document.getElementById('OtherEntries-form').style.display = 'none';
        document.getElementById('confir5').style.display = 'block';
    }
}

function Back5() {
    document.getElementById('confir5').style.display = "none";
    document.getElementById('OtherEntries-form').style.display = "block";
}

function submitConfi5() {
    const form = document.getElementById('Sform5');
    const formData = {
        Account: form.Account.value,
        entries: form.entries.value,
        EntryAmt: form.EntryAmt.value,
    };

    document.getElementById('confir5').style.display = 'none';
    document.getElementById('successful-sms').style.display = 'none'; 
    document.getElementById('failure-sms').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1300);
    

    fetch('/SuperuserInput4', {
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
    .then(data=> {
        document.getElementById('loading').style.display = 'none';
        if (data.success) {
            document.getElementById('loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successful-sms').style.display = 'block';
            }, 1300);
            setTimeout(() => {
                window.location.href = '/superuser';
            }, 3000)
        } else {
            document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confir5').style.display = 'block';
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
                document.getElementById('confir5').style.display = 'block';
        }, 5000);
    });
}

function confir6() {
    document.getElementById('err6').style.display = 'none';

    const A_type = document.querySelector('#Account-type1').value;
    const Amount = document.querySelector('#OtherEntries-form input[name="EcoCashOut"]').value;
    const Type = document.querySelector('#cashout').value;

    if (A_type === 'null' ||!Amount) {
        document.getElementById('err6').style.display = 'block';
        setTimeout(() => {
            document.getElementById('err6').style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confir6-cnt').textContent = A_type;
        document.querySelector('#confir6-typ').textContent = Type;
        document.querySelector('#confir6-amt').textContent = Amount;

        document.getElementById('OtherEntries-form').style.display = 'none';
        document.getElementById('confir6').style.display = 'block';
    }
}

function submitConfi6() {
    const form = document.getElementById('Sform6');
    const formData = {
        Account: form.Account.value,
        Cashout: form.Cashout.value,
        EcoCashOut: form.EcoCashOut.value,
    };

    document.getElementById('confir6').style.display = 'none';
    document.getElementById('successful-sms').style.display = 'none'; 
    document.getElementById('failure-sms').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1300);
    
    fetch('/SuperuserInput5', {
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
    .then(data=> {
        document.getElementById('loading').style.display = 'none';
        if (data.success) {
            document.getElementById('loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successful-sms').style.display = 'block';
            }, 1300);
            setTimeout(() => {
                window.location.href = '/superuser';
            }, 3000)
        } else {
            document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confir6').style.display = 'block';
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
                document.getElementById('confir6').style.display = 'block';
        }, 5000);
    });
}

function Back6() {
    document.getElementById('confir6').style.display = "none";
    document.getElementById('OtherEntries-form').style.display = "block";
}

function confir7() {
    document.getElementById('err7').style.display = 'none';

    const A_type = document.querySelector('#payment-typeF').value;
    const Amount = document.querySelector('#OtherEntries-form input[name="FAmount"]').value;
    const Type = document.querySelector('#fidelt').value;

    if (!Amount) {
        document.getElementById('err7').style.display = 'block';
        setTimeout(() => {
            document.getElementById('err7').style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confir7-cnt').textContent = A_type;
        document.querySelector('#confir7-typ').textContent = Type;
        document.querySelector('#confir7-amt').textContent = Amount;

        document.getElementById('OtherEntries-form').style.display = 'none';
        document.getElementById('confir7').style.display = 'block';
    }
}

function submitConfi7() {
    const form = document.getElementById('Sform7');
    const formData = {
        Account: form.Account.value,
        Fidel: form.Fidel.value,
        FAmount: form.FAmount.value,
    };

    document.getElementById('confir7').style.display = 'none';
    document.getElementById('successful-sms').style.display = 'none'; 
    document.getElementById('failure-sms').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1300);
    
    fetch('/SuperuserInput6', {
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
    .then(data=> {
        document.getElementById('loading').style.display = 'none';
        if (data.success) {
            document.getElementById('loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successful-sms').style.display = 'block';
            }, 1300);
            setTimeout(() => {
                window.location.href = '/superuser';
            }, 3000)
        } else {
            document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confir7').style.display = 'block';
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
                document.getElementById('confir7').style.display = 'block';
        }, 5000);
    });
}

function Back7() {
    document.getElementById('confir7').style.display = "none";
    document.getElementById('OtherEntries-form').style.display = "block";
}

function confir8() {
    document.getElementById('err8').style.display = 'none';

    const T_type = document.querySelector('#otselt').value;
    const Amount = document.querySelector('#OtherEntries-form input[name="OtAmount"]').value;
    const Account = document.querySelector('#Account-type2').value;

    if (!Amount || T_type === 'null' || Account === 'null' ) {
        document.getElementById('err8').style.display = 'block';
        setTimeout(() => {
            document.getElementById('err8').style.display = 'none';
        }, 1500);
    } else {
        document.querySelector('#confir8-tt').textContent = T_type;
        document.querySelector('#confir8-acnt').textContent = Account;
        document.querySelector('#confir8-amt').textContent = Amount;

        document.getElementById('OtherEntries-form').style.display = 'none';
        document.getElementById('confir8').style.display = 'block';
    }
}

function submitConfi8() {
    const form = document.getElementById('Sform8');
    const formData = {
        otherEco: form.otherEco.value,
        Account: form.Account.value,
        OtAmount: form.OtAmount.value,
    };

    document.getElementById('confir8').style.display = 'none';
    document.getElementById('successful-sms').style.display = 'none'; 
    document.getElementById('failure-sms').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1300);
    
    fetch('/SuperuserInput7', {
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
    .then(data=> {
        document.getElementById('loading').style.display = 'none';
        if (data.success) {
            document.getElementById('loading').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successful-sms').style.display = 'block';
            }, 1300);
            setTimeout(() => {
                window.location.href = '/superuser';
            }, 3000)
        } else {
            document.getElementById('failure-sms').style.display = 'block';
            setTimeout(() => {
                document.getElementById('failure-sms').style.display = 'none';
            }, 5000);
            document.getElementById('loading').style.display = 'none';
            setTimeout(() => {
                document.getElementById('confir8').style.display = 'block';
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
                document.getElementById('confir8').style.display = 'block';
        }, 5000);
    });
}

function Back8() {
    document.getElementById('confir8').style.display = "none";
    document.getElementById('OtherEntries-form').style.display = "block";
}

function hideForm() {
    document.getElementById('overlay').style.display = 'none';

    var forms = document.querySelectorAll('.popup-form');
    forms.forEach(function(form) {
        form.style.display = 'none';
    });
}
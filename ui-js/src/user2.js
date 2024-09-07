document.getElementById('description-type-momo').addEventListener('change', handleDescriptionChange);
document.getElementById('comm-description-momo').addEventListener('change', handleCommissionChange);

function handleDescriptionChange() {
    const descriptionType = this.value;
    const commDescription = document.getElementById('comm-description-momo');
    const commissionInput = document.getElementById('comm-momo');
    const commissionLabel = document.getElementById('cml1');
    const reasonLabel = document.getElementById('lr1');
    const reasonInput = document.getElementById('r1');
    const CL1 = document.getElementById('cd1');

    if (descriptionType === 'Withdrawal') {
        toggleElements([CL1, commDescription, commissionInput, commissionLabel, reasonLabel, reasonInput], 'none');
        commDescription.value = "Null"; 
        commissionInput.value = "0";
        reasonInput.value = "Null";
    } else if (descriptionType === 'Deposit') {
        toggleElements([CL1, commDescription], 'block');
        handleCommissionChange();
    }
}

function handleCommissionChange() {
    const commDescription = document.getElementById('comm-description-momo').value;
    const commissionInput = document.getElementById('comm-momo');
    const commissionLabel = document.getElementById('cml1');
    const reasonLabel = document.getElementById('lr1');
    const reasonInput = document.getElementById('r1');

    if (commDescription === 'Yes') {
        toggleElements([commissionInput, commissionLabel], 'block');
        toggleElements([reasonLabel, reasonInput], 'none');
        commissionInput.value = "";
        reasonInput.value = "Null";
    } else if (commDescription === 'No') {
        toggleElements([commissionInput, commissionLabel], 'none');
        toggleElements([reasonLabel, reasonInput], 'block');
        commissionInput.value = "0";
        reasonInput.value = ""; 
    }
}

function toggleElements(elements, displayStyle) {
    elements.forEach(element => {
        element.style.display = displayStyle;
    });
}


document.getElementById('bank-type').addEventListener('change', function () {
    const bankType = this.value;
    const descriptionType = document.getElementById('description-type');
    const commissionInput = document.querySelector('input[name="Commission"]');
    const commissionLabel = commissionInput.previousElementSibling;

    switch (bankType) {
        case 'ecobank':
            commissionLabel.style.display = 'none';
            commissionInput.style.display = 'none';
            commissionInput.value = '0';
            
            descriptionType.style.display = 'block';
            descriptionType.previousElementSibling.style.display = 'block';
            break;

        case 'fidelity':
        case 'Calbank':
            commissionLabel.style.display = 'none';
            commissionInput.style.display = 'none';
            commissionInput.value = '0';

            descriptionType.style.display = 'none';
            descriptionType.previousElementSibling.style.display = 'none';
            descriptionType.value = 'Deposit';
            break;

        case 'Other Banks':
            commissionLabel.style.display = 'block';
            commissionInput.style.display = 'block';

            descriptionType.style.display = 'none';
            descriptionType.previousElementSibling.style.display = 'none';
            descriptionType.value = 'Deposit';
            break;

        default:
            commissionLabel.style.display = 'block';
            commissionInput.style.display = 'block';
            commissionInput.value = '';
            
            descriptionType.style.display = 'block';
            descriptionType.previousElementSibling.style.display = 'block';
            descriptionType.value = '';
            break;
    }
});

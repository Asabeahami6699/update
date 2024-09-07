const express = require('express');
const xlsx = require('node-xlsx');
const {Transaction,UserMoMoCollection ,UserInputsCollection,
 UserDInputsCollection,SBTransaction ,SUserInput3Collection ,SuperuserInputsCollection,
OthersWithdrawalCollection,SusuDocs,TellerInput3,SUserInput4Collection,SUserInput5Collection } = require('./mongodb');
const fs = require('fs');
const path = require('path');

const app = express();

function createDateRange(startDate, endDate) {
    // Parse dates in format YYYY-MM-DD
    const start = new Date(`${startDate}T00:00:00Z`);
    const end = new Date(`${endDate}T23:59:59.999Z`);

    return { start, end };
}


// Convert documents to a format suitable for node-xlsx
function docsToSheetData(docs) {
    if (docs.length === 0) return [];

    const headers = Object.keys(docs[0].toObject());
    const data = docs.map(doc => Object.values(doc.toObject()));
    return [headers, ...data];
}

// Route to download Tellers Deposit Transactions
app.post('/download1', async (req, res) => {
    try {
        const { branch, tellertype, 'start-date': startDate, 'end-date': endDate } = req.body;

        const { start, end } = createDateRange(startDate, endDate);

        const baseFilters = {
            TheBranch: branch,
            TellerType: tellertype,
            Description: "Deposit",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters1 = {
            The_Branch: branch,
            Teller_Type: tellertype,
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters2 = {
            The_Branch: branch,
            Teller_Type: tellertype,
            Description: "Deposit",
            Timestamp: { $gte: start, $lte: end }
        };

        const userMoMoDocs = await UserMoMoCollection.find({ ...baseFilters, MoMo: { $in: ["mtn", "Voda"] } });
        const transactionDocs = await Transaction.find({ ...baseFilters, Bank: { $in: ["fidelity", "ecobank", "Calbank","Other Banks"] } });
        const userInputsDocs = await UserInputsCollection.find({ ...baseFilters1, TheType: "Initial Physical Cash" });
        const userDInputsDocs = await UserDInputsCollection.find({ ...baseFilters1, TheType: "Physical Cash Collected" });
        const SuSuDocs = await SusuDocs.find({ ...baseFilters2 });

        // Prepare data for the workbook
        const sheets = [
            { name: 'MoMo(Deposit)', data: docsToSheetData(userMoMoDocs) },
            { name: 'Banks(Deposit)', data: docsToSheetData(transactionDocs) },
            { name: 'IntialPcash', data: docsToSheetData(userInputsDocs) },
            { name: 'PcashColted', data: docsToSheetData(userDInputsDocs) },
            { name: 'SuSuDocs(Deposit)', data: docsToSheetData(SuSuDocs) }
        ];

        // Generate Excel file
        const buffer = xlsx.build(sheets);
        const filePath = path.join(__dirname, 'download.xlsx');
        fs.writeFileSync(filePath, buffer);

        res.download(filePath, 'Deposits_data.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading the file');
            }
            // Delete the file after sending it
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal server error');
    }
});


// Route to download Tellers Withdrawal Transactions
app.post('/downloadW', async (req, res) => {
    try {
        const { branch, tellertype, 'start-date': startDate, 'end-date': endDate } = req.body;

        const { start, end } = createDateRange(startDate, endDate);

        const baseFilters = {
            TheBranch: branch,
            TellerType: tellertype,
            Description: "Withdrawal",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters2 = {
            The_Branch: branch,
            Teller_Type: tellertype,
            Description: "Withdrawal",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters1 = {
            The_Branch: branch,
            Teller_Type: tellertype,
            Timestamp: { $gte: start, $lte: end }
        };

        const userMoMoDocs = await UserMoMoCollection.find({ ...baseFilters, MoMo: { $in: ["mtn", "Voda"] } });
        const transactionDocs = await Transaction.find({ ...baseFilters, Bank: "ecobank" });
        const OtherWithdrawalDocs = await OthersWithdrawalCollection.find({ ...baseFilters1 });
        const userWInputsDocs = await TellerInput3.find({ ...baseFilters1 });
        const SuSuDocs = await SusuDocs.find({ ...baseFilters2 });

        const sheets = [
            { name: 'MoMo(Withdrawals)', data: docsToSheetData(userMoMoDocs) },
            { name: 'Banks(Withdrawals)', data: docsToSheetData(transactionDocs) },
            { name: 'OtherWithdrawals', data: docsToSheetData(OtherWithdrawalDocs) },
            { name: 'UserInputs', data: docsToSheetData(userWInputsDocs) },
            { name: 'SuSuDocs', data: docsToSheetData(SuSuDocs) }
        ];

        const buffer = xlsx.build(sheets);
        const filePath = path.join(__dirname, 'download.xlsx');
        fs.writeFileSync(filePath, buffer);

        res.download(filePath, 'Withdrawals_data.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading the file');
            }
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal server error');
    }
});


// Route to download Superuser Transactions
app.post('/downloadS', async (req, res) => {
    try {
        const { 'start-date': startDate, 'end-date': endDate } = req.body;

        const { start, end } = createDateRange(startDate, endDate);

        const baseFilters = {
            Processor: "Superuser",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters1 = {
            Name: "Superuser",
            Timestamp: { $gte: start, $lte: end }
        };

        const TellerEntries = await SBTransaction.find({ ...baseFilters });
        const Commissions = await SUserInput3Collection.find({ ...baseFilters });
        const EcashAndOBalance = await SuperuserInputsCollection.find({ ...baseFilters1 });
        const AllEntries = await SUserInput4Collection.find({ ...baseFilters, The_Type: "Total Entries" });
        const EcobankCashOut = await SUserInput4Collection.find({ ...baseFilters, The_Type: "Ecobank Cash out" });
        const FidelityWithdwl = await SUserInput5Collection.find({ ...baseFilters, Account: "Fidelity Bank" });
        const OtherDeposits = await SUserInput5Collection.find({ ...baseFilters, The_Type: { $in: ["Other MTN MoMo Deposits",
        "Other Ecobank Deposits"] } });

        const sheets = [
            { name: 'Tellers Entry', data: docsToSheetData(TellerEntries) },
            { name: 'Tellers Comm', data: docsToSheetData(Commissions) },
            { name: 'Ecash & OBal', data: docsToSheetData(EcashAndOBalance) },
            { name: 'Total Entries', data: docsToSheetData(AllEntries) },
            { name: 'Ecobank COut', data: docsToSheetData(EcobankCashOut) },
            { name: 'Fidelity WD', data: docsToSheetData(FidelityWithdwl) },
            { name: 'Other Deposits', data: docsToSheetData(OtherDeposits) }
        ];

        const buffer = xlsx.build(sheets);
        const filePath = path.join(__dirname, 'download.xlsx');
        fs.writeFileSync(filePath, buffer);

        res.download(filePath, 'Superuser_data.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading the file');
            }
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal server error');
    }
});


// Route for Tellers to download their Deposit Transactions
app.post('/downloadUserDep', async (req, res) => {
    try {
        const { 'start-date': startDate, 'end-date': endDate } = req.body;

        const teller = req.user.tellertype;
        const Branch = req.user.branch;

        const { start, end } = createDateRange(startDate, endDate);

        const baseFilters = {
            TheBranch: Branch,
            TellerType: teller,
            Description: "Deposit",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters1 = {
            The_Branch: Branch,
            Teller_Type: teller,
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters2 = {
            The_Branch: Branch,
            Teller_Type: teller,
            Description: "Deposit",
            Timestamp: { $gte: start, $lte: end }
        };

        const userMoMoDocs = await UserMoMoCollection.find({ ...baseFilters, MoMo: { $in: ["mtn", "Voda"] } });
        const transactionDocs = await Transaction.find({ ...baseFilters, Bank: { $in: ["fidelity", "ecobank", "Calbank","Other Banks"] } });
        const userInputsDocs = await UserInputsCollection.find({ ...baseFilters1, TheType: "Initial Physical Cash" });
        const userDInputsDocs = await UserDInputsCollection.find({ ...baseFilters1, TheType: "Physical Cash Collected" });
        const SuSuDocs = await SusuDocs.find({ ...baseFilters2 });

        const sheets = [
            { name: 'MoMo(Deposit)', data: docsToSheetData(userMoMoDocs) },
            { name: 'Banks(Deposit)', data: docsToSheetData(transactionDocs) },
            { name: 'IntialPcash', data: docsToSheetData(userInputsDocs) },
            { name: 'PcashColted', data: docsToSheetData(userDInputsDocs) },
            { name: 'SuSuDocs(Deposit)', data: docsToSheetData(SuSuDocs) }
        ];

        const buffer = xlsx.build(sheets);
        const filePath = path.join(__dirname, 'download.xlsx');
        fs.writeFileSync(filePath, buffer);

        res.download(filePath, 'Deposits_data.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading the file');
            }
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal server error');
    }
});


app.post('/downloadUserWdwl', async (req, res) => {
    try {
        const { 'start-date': startDate, 'end-date': endDate } = req.body;

        const teller = req.user.tellertype;
        const Branch = req.user.branch;

        const { start, end } = createDateRange(startDate, endDate);

        const baseFilters = {
            TheBranch: Branch,
            TellerType: teller,
            Description: "Withdrawal",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters2 = {
            The_Branch: Branch,
            Teller_Type: teller,
            Description: "Withdrawal",
            Timestamp: { $gte: start, $lte: end }
        };

        const baseFilters1 = {
            The_Branch: Branch,
            Teller_Type: teller,
            Timestamp: { $gte: start, $lte: end }
        };

        const userMoMoDocs = await UserMoMoCollection.find({ ...baseFilters, MoMo: { $in: ["mtn", "Voda"] } });
        const transactionDocs = await Transaction.find({ ...baseFilters, Bank: "ecobank" });
        const OtherWithdrawalDocs = await OthersWithdrawalCollection.find({ ...baseFilters1 });
        const userWInputsDocs = await TellerInput3.find({ ...baseFilters1 });
        const SuSuDocs = await SusuDocs.find({ ...baseFilters2 });

        const sheets = [
            { name: 'MoMo(Withdrawals)', data: docsToSheetData(userMoMoDocs) },
            { name: 'Banks(Withdrawals)', data: docsToSheetData(transactionDocs) },
            { name: 'OtherWithdrawals', data: docsToSheetData(OtherWithdrawalDocs) },
            { name: 'UserInputs', data: docsToSheetData(userWInputsDocs) },
            { name: 'SuSuDocs', data: docsToSheetData(SuSuDocs) }
        ];

        const buffer = xlsx.build(sheets);
        const filePath = path.join(__dirname, 'download.xlsx');
        fs.writeFileSync(filePath, buffer);

        res.download(filePath, 'Withdrawals_data.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error downloading the file');
            }
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal server error');
    }
});


// Route to delete B.M.S Transactions
app.post('/DeleteDoc1', async (req, res) => {
    const { branch, tellertype, transactionType, description, TransNumber, amount, date } = req.body;

    try {
        let result;
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        if (["ecobank", "fidelity", "Calbank", "Other Banks"].includes(transactionType)) {
            result = await Transaction.deleteOne({
                Bank: transactionType,
                TheBranch: branch,
                TellerType: tellertype,
                Description: description,
                AccounTNumber: TransNumber,
                Amount: amount,
                Timestamp: { $gte: startDate, $lte: endDate }
            });
        } else if (["mtn", "Voda"].includes(transactionType)) {
            result = await UserMoMoCollection.deleteOne({
                MoMo: transactionType,
                TheBranch: branch,
                TellerType: tellertype,
                Description: description,
                MoMoNumber: TransNumber,
                Amount: amount,
                Timestamp: { $gte: startDate, $lte: endDate }
            });
        } else {
            result = await SusuDocs.deleteOne({
                The_Branch: branch,
                Teller_Type: tellertype,
                Description: description,
                AccounTNumber: TransNumber,
                Amount: amount,
                Timestamp: { $gte: startDate, $lte: endDate }
            });
        }

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "No matching document found." });
        }

        res.json({ success: "Document deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

// Route to delete Other Withdrawal Transactions
app.post('/deleteOtherWithdrawal', async (req, res) => {
    const { withdrawalType, branch, tellertype, Odname, Odamount, dateOd } = req.body;

    try {
        const withdrawalDate = new Date(dateOd);

        const startOfDay = new Date(withdrawalDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(withdrawalDate.setHours(23, 59, 59, 999));

        const withdrawal = await OthersWithdrawalCollection.findOneAndDelete({
            Type: withdrawalType,
            The_Branch: branch,
            Teller_Type: tellertype,
            Beneficial_Name: Odname,
            Amount: Odamount,
            Timestamp: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        if (!withdrawal) {
            return res.status(404).json({ error: 'No matching document found.' });
        }

        res.json({ success: "Document deleted successfully!" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// Route to delete UserInput Transactions
app.post('/deleteUserInput', async (req, res) => {
    const { Name, TheType, InputAmount, date } = req.body;

    try {
        let result;
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        if (TheType === "Initial Physical Cash") {
            result = await UserInputsCollection.deleteOne({
                Name,
                TheType,
                InputAmount,
                Timestamp: { $gte: startDate, $lte: endDate }
            });
        } else if (TheType === "Physical Cash Collected") {
            result = await UserDInputsCollection.deleteOne({
                Name,
                TheType,
                InputAmount,
                Timestamp: { $gte: startDate, $lte: endDate }
            });
        } else if (["Expenses", "Cash To Bank", "Physical Cash Remaining"].includes(TheType)) {
            result = await TellerInput3.deleteOne({
                Name,
                Type: TheType, 
                Amount: InputAmount, 
                Timestamp: { $gte: startDate, $lte: endDate }
            });
        }

        if (!result || result.deletedCount === undefined) {
            return res.status(500).json({ error: "Unexpected error occurred. Please try again." });
        }

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "No matching record found." });
        }

        res.json({ success: "Document deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});



module.exports = app;
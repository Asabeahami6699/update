const express = require('express');
const Middleware = require('./middleware');
const Routes = require('./routes');
const getroutes = require('./GetRoutes');
const Route2 = require('./routes2');
const DRoutes = require('./DownloadRoutes');

const {countMoMoDocuments,MoMoTransferredAmount,countFDocuments,FidelityTransferredAmount,countEDocuments,EcobankTransferredAmount
,countCDocuments,countOtherBDocuments,CalbankTransferredAmount,OtherBTransferredAmount,TotalCostumers,TotalAmoutTrans,fetchInitialPCash,
TotalCashColltd,TotalcPcash,SusuTransferredAmount,countSuSuDocuments,countVodaDocuments
,VodaTransferredAmount} = require('./SpecialMiddlewares/UserEJSMiddleware');

const {TotalTranscCostumers,TotalBalancing,A1ACOST,A1BLC,A2ACOST,A2BLC,B1ACOST,B1BLC,B2ACOST,B2BLC,P1ACOST,P1BLC,P2ACOST
,P2BLC} = require('./SpecialMiddlewares/UserOutputEJSMid');

const {AT1MoMoDocuments,AT1VodaDocuments,AT1VodaTransferredAmount,AT1countOtherBDocuments,AT1OtherBTransferredAmount,
AT1fetchInitialPCash,AT1TotalCashColltd,AT1MoMoTransferredAmount,AT1countFDocuments,AT1FidelityTransferredAmount,
AT1countEDocuments,AT1EcobankTransferredAmount,AT1countCDocuments,AT1CalbankTransferredAmount,AT1countSuSuDocuments,
AT1SusuTransferredAmount,AT1TotalCostumers,AT1TotalAmountTransf,AT1TotalcPcash} = require('./SpecialMiddlewares/AT1DepositsMids');

const {AT2MoMoDocuments,AT2VodaDocuments,AT2VodaTransferredAmount,AT2countOtherBDocuments,AT2OtherBTransferredAmount,
AT2fetchInitialPCash,AT2TotalCashColltd,AT2MoMoTransferredAmount,AT2countFDocuments,AT2FidelityTransferredAmount,
AT2countEDocuments,AT2EcobankTransferredAmount,AT2countCDocuments,AT2CalbankTransferredAmount,AT2countSuSuDocuments,
AT2SusuTransferredAmount,AT2TotalCostumers,AT2TotalAmountTransf,AT2TotalcPcash} = require('./SpecialMiddlewares/AT2DepositsMids');

const {BT1MoMoDocuments,BT1VodaDocuments,BT1VodaTransferredAmount,BT1countOtherBDocuments,BT1OtherBTransferredAmount,
BT1fetchInitialPCash,BT1TotalCashColltd,BT1MoMoTransferredAmount,BT1countFDocuments,BT1FidelityTransferredAmount,
BT1countEDocuments,BT1EcobankTransferredAmount,BT1countCDocuments,BT1CalbankTransferredAmount,BT1countSuSuDocuments,
BT1SusuTransferredAmount,BT1TotalCostumers,BT1TotalAmountTransf,BT1TotalcPcash} = require('./SpecialMiddlewares/BT1DepositsMids');

const {BT2MoMoDocuments,BT2VodaDocuments,BT2VodaTransferredAmount,BT2countOtherBDocuments,BT2OtherBTransferredAmount,
BT2fetchInitialPCash,BT2TotalCashColltd,BT2MoMoTransferredAmount,BT2countFDocuments,BT2FidelityTransferredAmount,
BT2countEDocuments,BT2EcobankTransferredAmount,BT2countCDocuments,BT2CalbankTransferredAmount,BT2countSuSuDocuments,
BT2SusuTransferredAmount,BT2TotalCostumers,BT2TotalAmountTransf,BT2TotalcPcash} = require('./SpecialMiddlewares/BT2DepositsMids');

const {PT1MoMoDocuments,PT1VodaDocuments,PT1VodaTransferredAmount,PT1countOtherBDocuments,PT1OtherBTransferredAmount,
PT1fetchInitialPCash,PT1TotalCashColltd,PT1MoMoTransferredAmount,PT1countFDocuments,PT1FidelityTransferredAmount,
PT1countEDocuments,PT1EcobankTransferredAmount,PT1countCDocuments,PT1CalbankTransferredAmount,PT1countSuSuDocuments,
PT1SusuTransferredAmount,PT1TotalCostumers,PT1TotalAmountTransf,PT1TotalcPcash} = require('./SpecialMiddlewares/PT1DepositsMids');

const {PT2MoMoDocuments,PT2VodaDocuments,PT2VodaTransferredAmount,PT2countOtherBDocuments,PT2OtherBTransferredAmount,
PT2fetchInitialPCash,PT2TotalCashColltd,PT2MoMoTransferredAmount,PT2countFDocuments,PT2FidelityTransferredAmount,
PT2countEDocuments,PT2EcobankTransferredAmount,PT2countCDocuments,PT2CalbankTransferredAmount,PT2countSuSuDocuments,
PT2SusuTransferredAmount,PT2TotalCostumers,PT2TotalAmountTransf,PT2TotalcPcash} = require('./SpecialMiddlewares/PT2DepositMids');

const {A1MoMoC,A1GmC,AtmA1,A1Voda,A1Ec,A1Ezc,A1susuC,A1RemC,A1VdWm,A1EWm,A1MTNm,A1susuM,A1Gmm,A1Atmm,A1Ezm,A1Rem,A1Com,
A1ctb,A1Ex,A1CR,A1TCos,A1TAM,A1ActW} = require('./SpecialWidwlMids/AT1Wid');

const {A2MoMoC,A2GmC,AtmA2,A2Voda,A2Ec,A2Ezc,A2susuC,A2RemC,A2VdWm,A2EWm,A2MTNm,A2susuM,A2Gmm,A2Atmm,A2Ezm,A2Rem,A2Com,
A2ctb,A2Ex,A2CR,A2TCos,A2TAM,A2ActW} = require('./SpecialWidwlMids/AT2Wid');

const {B1MoMoC,B1GmC,AtmB1,B1Voda,B1Ec,B1Ezc,B1susuC,B1RemC,B1VdWm,B1EWm,B1MTNm,B1susuM,B1Gmm,B1Atmm,B1Ezm,B1Rem,B1Com,
B1ctb,B1Ex,B1CR,B1TCos,B1TAM,B1ActW} = require('./SpecialWidwlMids/B1Wid');

const {B2MoMoC,B2GmC,AtmB2,B2Voda,B2Ec,B2Ezc,B2susuC,B2RemC,B2VdWm,B2EWm,B2MTNm,B2susuM,B2Gmm,B2Atmm,B2Ezm,B2Rem,B2Com,
B2ctb,B2Ex,B2CR,B2TCos,B2TAM,B2ActW} = require('./SpecialWidwlMids/B2Wid');

const {P1MoMoC,P1GmC,AtmP1,P1Voda,P1Ec,P1Ezc,P1susuC,P1RemC,P1VdWm,P1EWm,P1MTNm,P1susuM,P1Gmm,P1Atmm,P1Ezm,P1Rem,P1Com,
P1ctb,P1Ex,P1CR,P1TCos,P1TAM,P1ActW} = require('./SpecialWidwlMids/P1Wid');

const {P2MoMoC,P2GmC,AtmP2,P2Voda,P2Ec,P2Ezc,P2susuC,P2RemC,P2VdWm,P2EWm,P2MTNm,P2susuM,P2Gmm,P2Atmm,P2Ezm,P2Rem,P2Com,
P2ctb,P2Ex,P2CR,P2TCos,P2TAM,P2ActW} = require('./SpecialWidwlMids/P2Wid');

const {E1out,E2out,E3out,E4out,ETout,OtEco,OtMTN,FidWdl,SA1M,SA2M,SB1M,SB2M,SP1M,SP2M,STTM} = require('./SpecialMiddlewares/SUserMids');

const {SA1EC,SA2EC,SB1EC,SB2EC,SP1EC,SP2EC,SA1EDFF,SA2EDFF,SB1EDFF,SB2EDFF,SP1EDFF,SP2EDFF} = require('./SpecialMiddlewares/SUserMids2');

const {SA1FC,SA2FC,SB1FC,SB2FC,SP1FC,SP2FC,SA1FDFF,SA2FDFF,SB1FDFF,SB2FDFF,SP1FDFF,SP2FDFF} = require('./SpecialMiddlewares/SUserMids3');

const {SA1CC,SA2CC,SB1CC,SB2CC,SP1CC,SP2CC,SA1CDFF,SA2CDFF,SB1CDFF,SB2CDFF,SP1CDFF,SP2CDFF} = require('./SpecialMiddlewares/SUserMids4');

const {SA1OC,SA2OC,SB1OC,SB2OC,SP1OC,SP2OC,SA1ODFF,SA2ODFF,SB1ODFF,SB2ODFF,SP1ODFF,SP2ODFF} = require('./SpecialMiddlewares/SUserMids5');

const {STTOB,SA1CMM,SA2CMM,SB1CMM,SB2CMM,SP1CMM,SP2CMM,SA1CMMDFF,SA2CMMDFF,SB1CMMDFF,SB2CMMDFF,SP1CMMDFF
,SP2CMMDFF} = require('./SpecialMiddlewares/SUserMids6');

const {SA1MDFF,SA2MDFF,SB1MDFF,SB2MDFF,SP1MDFF,SP2MDFF,SCBLC,SMBLC,SFBLC,SE1BLC,SE2BLC,SE3BLC,
SE4BLC} = require('./SpecialMiddlewares/SUserMids7');

const {TTMWD,TTVWD,TTSWD,TTEWD,TTGWD,TTAWD,TTEZWD,TTRWD,TTCBK,TTWCO,TTPCR,TTAMTW,TTEXP,TTCOM,
TTACTW} = require('./SpecialWidwlMids/UserMids1');

const {TTMDP,TTVDP,TTSDP,TTEDP,TTFDP,TTCDP,TTODP,TTDCO,TTAFR,TTPCC,TTINT,TTDPT} = require('./SpecialWidwlMids/UserMid2');

const {AT1TotalCost,AT1TotalDp,AT2TotalCost,AT2TotalDp} = require('./SpecialMiddlewares/UserBlcMids');

const {MoChA1,MoChA2,MoChB1,MoChB2,MoChP1,MoChP2,MoChT} = require('./SpecialMiddlewares/SUserMids8');


const {countWithdMoMoDocuments,countEWithdlDocuments,countSuSuWithdlDocuments,countEZwichDocuments,
countVodaWdDocuments,ATMDocuments,GMoneyWithdl,countRemitDocuments,TotalWithdlCostumers,VodaWithdrawalAmount,
EcobankWithdrawalAmount,MoMoWithdrawalAmount,SuSuWithdrawalAmount,GMoneyWithdlAmount,ATMWithdlAmount,
EzwichWithdlAmount,RemittWithdlAmount,CashRemaining,ExpensesAmount,CommissionAmount,CashToBankAmount,
TotalAmountWithdrew,ActualAmountWithdrew} = require('./SpecialMiddlewares/UserWithdwlEJSMid');  


const {Mobc,MechC,Mtfat,Mcblc,Foblc,Fecash,Fftat,Fcblc,E1oblc,E2oblc,E3oblc,E4oblc,E1cash,E2cash,E3cash,E4cash,
E1tfat,E2tfat,E3tfat,E4tfat,E1cblc,E2cblc,E3cblc,E4cblc,Coblc,Cecash,Ctfat,Ccblc,TEtfat} = require('./SpecialMiddlewares/SuserEJSMiddleware');  


const app = express();

const PORT = process.env.MY_PORT || 3000;

app.use(Middleware);
app.use(Routes);
app.use(getroutes);
app.use(Route2);
app.use(DRoutes);



app.get('/admin',checkAuthenticated ,checkRole('Administrator'),
//Aiyinase Teller 1 Deposits Middlewares
AT1MoMoDocuments,AT1VodaDocuments,AT1VodaTransferredAmount,AT1countOtherBDocuments,
AT1OtherBTransferredAmount,AT1fetchInitialPCash,AT1TotalCashColltd,AT1MoMoTransferredAmount,AT1countFDocuments,AT1FidelityTransferredAmount,
AT1countEDocuments,AT1EcobankTransferredAmount,AT1countCDocuments,AT1CalbankTransferredAmount,AT1countSuSuDocuments,
AT1SusuTransferredAmount,AT1TotalCostumers,AT1TotalAmountTransf,AT1TotalcPcash,
//Aiyinase Teller 2 Deposits Middlewares
AT2MoMoDocuments,AT2VodaDocuments,AT2VodaTransferredAmount,AT2countOtherBDocuments,AT2OtherBTransferredAmount,
AT2fetchInitialPCash,AT2TotalCashColltd,AT2MoMoTransferredAmount,AT2countFDocuments,AT2FidelityTransferredAmount,
AT2countEDocuments,AT2EcobankTransferredAmount,AT2countCDocuments,AT2CalbankTransferredAmount,AT2countSuSuDocuments,
AT2SusuTransferredAmount,AT2TotalCostumers,AT2TotalAmountTransf,AT2TotalcPcash,
//Bogoso Teller 1 Deposits Middlewares
BT1MoMoDocuments,BT1VodaDocuments,BT1VodaTransferredAmount,BT1countOtherBDocuments,BT1OtherBTransferredAmount,
BT1fetchInitialPCash,BT1TotalCashColltd,BT1MoMoTransferredAmount,BT1countFDocuments,BT1FidelityTransferredAmount,
BT1countEDocuments,BT1EcobankTransferredAmount,BT1countCDocuments,BT1CalbankTransferredAmount,BT1countSuSuDocuments,
BT1SusuTransferredAmount,BT1TotalCostumers,BT1TotalAmountTransf,BT1TotalcPcash,
//Bogoso Teller 2 Deposits Middlewares
BT2MoMoDocuments,BT2VodaDocuments,BT2VodaTransferredAmount,BT2countOtherBDocuments,BT2OtherBTransferredAmount,
BT2fetchInitialPCash,BT2TotalCashColltd,BT2MoMoTransferredAmount,BT2countFDocuments,BT2FidelityTransferredAmount,
BT2countEDocuments,BT2EcobankTransferredAmount,BT2countCDocuments,BT2CalbankTransferredAmount,BT2countSuSuDocuments,
BT2SusuTransferredAmount,BT2TotalCostumers,BT2TotalAmountTransf,BT2TotalcPcash,
//Prestea Teller 1 Deposits Middlewares
PT1MoMoDocuments,PT1VodaDocuments,PT1VodaTransferredAmount,PT1countOtherBDocuments,PT1OtherBTransferredAmount,
PT1fetchInitialPCash,PT1TotalCashColltd,PT1MoMoTransferredAmount,PT1countFDocuments,PT1FidelityTransferredAmount,
PT1countEDocuments,PT1EcobankTransferredAmount,PT1countCDocuments,PT1CalbankTransferredAmount,PT1countSuSuDocuments,
PT1SusuTransferredAmount,PT1TotalCostumers,PT1TotalAmountTransf,PT1TotalcPcash,
//Prestea Teller 2 Deposits Middlewares
PT2MoMoDocuments,PT2VodaDocuments,PT2VodaTransferredAmount,PT2countOtherBDocuments,PT2OtherBTransferredAmount,
PT2fetchInitialPCash,PT2TotalCashColltd,PT2MoMoTransferredAmount,PT2countFDocuments,PT2FidelityTransferredAmount,
PT2countEDocuments,PT2EcobankTransferredAmount,PT2countCDocuments,PT2CalbankTransferredAmount,PT2countSuSuDocuments,
PT2SusuTransferredAmount,PT2TotalCostumers,PT2TotalAmountTransf,PT2TotalcPcash,
//Other Deposits Middlewares
TTMDP,TTVDP,TTSDP,TTEDP,TTFDP,TTCDP,TTODP,TTDCO,TTAFR,TTPCC,TTINT,TTDPT
 ,(req, res) => {
    res.render('admin.ejs' ,{ 
      //Aiyinase Teller 1 Deposits EJS Display Request Variables
      AT1count: req.AT1documentsCount,AT1Vcount: req.AT1documentsVCount,AT1VodatransferredAmount: req.AT1VodatransferredAmount,
      AT1odcount: req.AT1documentsodCount,AT1ObtransferredAmount: req.AT1ObtransferredAmount,AT1InitialPCash: req.AT1InitialPCash,
      AT1totalColtdPcash: req.AT1totalColtdPcash,AT1transferredAmount: req.AT1transferredAmount,AT1countF: req.AT1documentsCountF,
      AT1FtransferredAmount: req.AT1FtransferredAmount,AT1countE: req.AT1documentsCountE,AT1EtransferredAmount: req.AT1EtransferredAmount,
      AT1countC: req.AT1documentsCountC,AT1CtransferredAmount: req.AT1CtransferredAmount,AT1countsusu: req.AT1documentsCountsusu,
      AT1SutransferredAmount: req.AT1SutransferredAmount,AT1TotalCostumers: req.AT1TotalCostumers,AT1TotalAmoutTrans: req.AT1TotalAmoutTrans,
      AT1TTotalcPcash: req.AT1TTotalcPcash, 
      //Aiyinase Teller 2 Deposits EJS Display Request Variables
      AT2count : req.AT2documentsCount,AT2Vcount: req.AT2documentsVCount,AT2VodatransferredAmount: req.AT2VodatransferredAmount,
      AT2odcount: req.AT2documentsodCount,AT2ObtransferredAmount: req.AT2ObtransferredAmount,AT2InitialPCash: req.AT2InitialPCash,
      AT2totalColtdPcash: req.AT2totalColtdPcash,AT2transferredAmount: req.AT2transferredAmount,AT2countF: req.AT2documentsCountF,
      AT2FtransferredAmount: req.AT2FtransferredAmount,AT2countE: req.AT2documentsCountE,AT2EtransferredAmount: req.AT2EtransferredAmount,
      AT2countC: req.AT2documentsCountC,AT2CtransferredAmount: req.AT2CtransferredAmount,AT2countsusu: req.AT2documentsCountsusu,
      AT2SutransferredAmount: req.AT2SutransferredAmount,AT2TotalCostumers: req.AT2TotalCostumers,AT2TotalAmoutTrans: req.AT2TotalAmoutTrans,
      AT2TTotalcPcash: req.AT2TTotalcPcash,
      //Bogoso Teller 1 Deposits EJS Display Request Variables
      BT1count: req.BT1documentsCount,BT1Vcount: req.BT1documentsVCount,BT1VodatransferredAmount: req.BT1VodatransferredAmount,
      BT1odcount: req.BT1documentsodCount,BT1ObtransferredAmount: req.BT1ObtransferredAmount,BT1InitialPCash: req.BT1InitialPCash,
      BT1totalColtdPcash: req.BT1totalColtdPcash,BT1transferredAmount: req.BT1transferredAmount,BT1countF: req.BT1documentsCountF,
      BT1FtransferredAmount: req.BT1FtransferredAmount,BT1countE: req.BT1documentsCountE,BT1EtransferredAmount: req.BT1EtransferredAmount,
      BT1countC: req.BT1documentsCountC,BT1CtransferredAmount: req.BT1CtransferredAmount,BT1countsusu: req.BT1documentsCountsusu,
      BT1SutransferredAmount: req.BT1SutransferredAmount,BT1TotalCostumers: req.BT1TotalCostumers,BT1TotalAmoutTrans: req.BT1TotalAmoutTrans,
      BT1TTotalcPcash: req.BT1TTotalcPcash,
      //Bogoso Teller 2 Deposits EJS Display Request Variables
      BT2count: req.BT2documentsCount,BT2Vcount: req.BT2documentsVCount,BT2VodatransferredAmount: req.BT2VodatransferredAmount,
      BT2odcount: req.BT2documentsodCount,BT2ObtransferredAmount: req.BT2ObtransferredAmount,BT2InitialPCash: req.BT2InitialPCash,
      BT2totalColtdPcash: req.BT2totalColtdPcash,BT2transferredAmount: req.BT2transferredAmount,BT2countF: req.BT2documentsCountF,
      BT2FtransferredAmount: req.BT2FtransferredAmount,BT2countE: req.BT2documentsCountE,BT2EtransferredAmount: req.BT2EtransferredAmount,
      BT2countC: req.BT2documentsCountC,BT2CtransferredAmount: req.BT2CtransferredAmount,BT2countsusu: req.BT2documentsCountsusu,
      BT2SutransferredAmount: req.BT2SutransferredAmount,BT2TotalCostumers: req.BT2TotalCostumers,BT2TotalAmoutTrans: req.BT2TotalAmoutTrans,
      BT2TTotalcPcash: req.BT2TTotalcPcash,
      //Prestea Teller 1 Deposits EJS Display Request Variables
      PT1count: req.PT1documentsCount,PT1Vcount: req.PT1documentsVCount,PT1VodatransferredAmount: req.PT1VodatransferredAmount,
      PT1odcount: req.PT1documentsodCount,PT1ObtransferredAmount: req.PT1ObtransferredAmount,PT1InitialPCash: req.PT1InitialPCash,
      PT1totalColtdPcash: req.PT1totalColtdPcash,PT1transferredAmount: req.PT1transferredAmount,PT1countF: req.PT1documentsCountF,
      PT1FtransferredAmount: req.PT1FtransferredAmount,PT1countE: req.PT1documentsCountE,PT1EtransferredAmount: req.PT1EtransferredAmount,
      PT1countC: req.PT1documentsCountC,PT1CtransferredAmount: req.PT1CtransferredAmount,PT1countsusu: req.PT1documentsCountsusu,
      PT1SutransferredAmount: req.PT1SutransferredAmount,PT1TotalCostumers: req.PT1TotalCostumers,PT1TotalAmoutTrans: req.PT1TotalAmoutTrans,
      PT1TTotalcPcash: req.PT1TTotalcPcash,
      //Prestea Teller 2 Deposits EJS Display Request Variables
      PT2count: req.PT2documentsCount,PT2Vcount: req.PT2documentsVCount,PT2VodatransferredAmount: req.PT2VodatransferredAmount,
      PT2odcount: req.PT2documentsodCount,PT2ObtransferredAmount: req.PT2ObtransferredAmount,PT2InitialPCash: req.PT2InitialPCash,
      PT2totalColtdPcash: req.PT2totalColtdPcash,PT2transferredAmount: req.PT2transferredAmount,PT2countF: req.PT2documentsCountF,
      PT2FtransferredAmount: req.PT2FtransferredAmount,PT2countE: req.PT2documentsCountE,PT2EtransferredAmount: req.PT2EtransferredAmount,
      PT2countC: req.PT2documentsCountC,PT2CtransferredAmount: req.PT2CtransferredAmount,PT2countsusu: req.PT2documentsCountsusu,
      PT2SutransferredAmount: req.PT2SutransferredAmount,PT2TotalCostumers: req.PT2TotalCostumers,PT2TotalAmoutTrans: req.PT2TotalAmoutTrans,
      PT2TTotalcPcash: req.PT2TTotalcPcash,
      //Other Deposits EJS Display Request Variables
      ttmd: req.ttmd,ttvd: req.ttvd,ttsd: req.ttsd,tted: req.tted,ttfd: req.ttfd,ttcd: req.ttcd,ttod: req.ttod,ttdc: req.ttdc,
      ttaf: req.ttaf,ttcc: req.ttcc,ttin: req.ttin,ttdp: req.ttdp
    });
});


app.get('/user',checkAuthenticated ,checkRole('Teller')
//All User Deposits Middlewares
,countMoMoDocuments,MoMoTransferredAmount,countFDocuments,FidelityTransferredAmount
,countEDocuments,EcobankTransferredAmount,countCDocuments,CalbankTransferredAmount,VodaTransferredAmount,SusuTransferredAmount
,OtherBTransferredAmount,countOtherBDocuments,countSuSuDocuments,countVodaDocuments,TotalCostumers,TotalAmoutTrans,fetchInitialPCash,
TotalCashColltd,TotalcPcash,
//All User Withdrawals Middleware
countWithdMoMoDocuments,countEWithdlDocuments,countSuSuWithdlDocuments,countEZwichDocuments,countVodaWdDocuments,
ATMDocuments,GMoneyWithdl,countRemitDocuments,TotalWithdlCostumers,VodaWithdrawalAmount,
EcobankWithdrawalAmount,MoMoWithdrawalAmount,SuSuWithdrawalAmount,GMoneyWithdlAmount,ATMWithdlAmount,
EzwichWithdlAmount,RemittWithdlAmount,CashRemaining,ExpensesAmount,CommissionAmount,CashToBankAmount,TotalAmountWithdrew,
ActualAmountWithdrew
//All User Final Balancing Middleware
,TotalTranscCostumers,TotalBalancing,
(req, res) => {

  res.render('user.ejs' ,{ 
    //All User Deposits EJS Display Request Variables
     name: req.user.name ,count: req.documentsCount,transferredAmount: req.transferredAmount,countF: req.documentsCountF,
     FtransferredAmount : req.FtransferredAmount,countE: req.documentsCountE,EtransferredAmount : req.EtransferredAmount,
     countC : req.documentsCountC,CtransferredAmount: req.CtransferredAmount,TotalCostumers : req.TotalCostumers,
     TotalAmoutTrans :req.TotalAmoutTrans,InitialPCash: req.InitialPCash,totalColtdPcash : req.totalColtdPcash,
     TTotalcPcash : req.TTotalcPcash, odcount: req.documentsodCount,ObtransferredAmount: req.ObtransferredAmount,
     SutransferredAmount: req.SutransferredAmount,countsusu: req.documentsCountsusu,Vcount: req.documentsVCount,
     VodatransferredAmount: req.VodatransferredAmount,
     //All User Withdrawals EJS Display Request Variables
     Wcount: req.WdocumentsCount,Gcount: req.documentsGCount,AMTcount: req.documentsATMCount,countvw: req.documentsCountvw,
     countEw: req.documentsCountEw,countz: req.documentsCountZ,countsusuWd: req.documentsCountsusuWd,
     countR: req.documentsCountR,TotalWCostumers: req.TotalWCostumers,VodawithdrawalAmount: req.VodawithdrawalAmount,
     EcobankWithdrawalAmount: req.EcobankWithdrawalAmount,MoMoWithdrawalAmount: req.MoMoWithdrawalAmount,
     SusuWithdrawalAmount: req.SusuWithdrawalAmount,GMoneyAmount: req.GMoneyAmount,ATMAmount: req.ATMAmount,
     EzwichAmount: req.EzwichAmount,RemittAmount: req.RemittAmount,TotalWAmount: req.TotalWAmount,RemainPCash: req.RemainPCash,
     ExpensesAmount: req.ExpensesAmount,finalCommssAmount: req.CommssAmount,LoadingAmount: req.LoadingAmount,
     ActualWAmount: req.ActualWAmount,
     //All User Final Balancing EJS Display Request Variables
     TotalTCostumers: req.TotalTCostumers,TotalTBalance:req.TotalTBalance   

      
  });
});


app.get('/superuser',checkAuthenticated,checkRole('Superuser'),
Mobc,MechC,Mtfat,MoChA1,MoChA2,MoChB1,MoChB2,MoChP1,MoChP2,MoChT,Mcblc,Foblc,Fecash,Fftat,Fcblc,E1oblc,E2oblc,E3oblc,E4oblc,E1cash,E2cash,E3cash,E4cash,
E1tfat,E2tfat,E3tfat,E4tfat,E1cblc,E2cblc,E3cblc,E4cblc,Coblc,Cecash,Ctfat,Ccblc,(req, res) => {
    res.render('superuser.ejs' ,{ 
      name: req.user.name,Mobcl: req.Mobcl,Ecash: req.Ecash,Mtfa: req.Mtfa,Mcbl: req.Mcbl,Fobl: req.Fobl,Fecas: req.Fecas,
      Ftfa: req.Ftfa,Fcbl: req.Fcbl,E1obl: req.E1obl,E2obl: req.E2obl,E3obl: req.E3obl,E4obl: req.E4obl,E1cas: req.E1cas,
      E2cas: req.E2cas,E3cas: req.E3cas,E4cas: req.E4cas,E1tfa: req.E1tfa,E2tfa: req.E2tfa,E3tfa: req.E3tfa,E4tfa: req.E4tfa,
      E1cbl: req.E1cbl,E2cbl: req.E2cbl,E3cbl: req.E3cbl,E4cbl: req.E4cbl,Cobl: req.Cobl,Cecas: req.Cecas,Ctfa: req.Ctfa,
      Ccbl: req.Ccbl
        
    });
});

app.get('/superuser2',checkAuthenticated,
//Superuser Transaction Middlewares
Mobc,MechC,Mtfat,MoChA1,MoChA2,MoChB1,MoChB2,MoChP1,MoChP2,MoChT,Mcblc,Foblc,Fecash,Fftat,Fcblc,E1oblc,E2oblc,E3oblc,E4oblc,E1cash,E2cash,E3cash,E4cash,
E1tfat,E2tfat,E3tfat,E4tfat,E1cblc,E2cblc,E3cblc,E4cblc,Coblc,Cecash,Ctfat,Ccblc,
E1out,E2out,E3out,E4out,ETout,OtEco,OtMTN,FidWdl,SCBLC,SMBLC,SFBLC,SE1BLC,SE2BLC,SE3BLC,SE4BLC,
//Tellers MTN MOMO Deposits Middlewares
AT1MoMoTransferredAmount,AT2MoMoTransferredAmount,BT1MoMoTransferredAmount,BT2MoMoTransferredAmount,PT1MoMoTransferredAmount,
PT2MoMoTransferredAmount,
//Tellers ECOBANK Deposits Middlewares
AT1EcobankTransferredAmount,AT2EcobankTransferredAmount,BT1EcobankTransferredAmount,BT2EcobankTransferredAmount,PT1EcobankTransferredAmount,
PT2EcobankTransferredAmount,
//Tellers FIDELITY Deposits Middlewares
AT1FidelityTransferredAmount,AT2FidelityTransferredAmount,BT1FidelityTransferredAmount,BT2FidelityTransferredAmount,
PT1FidelityTransferredAmount,PT2FidelityTransferredAmount,
//Tellers CALBANK Deposits Middlewares
AT1CalbankTransferredAmount,AT2CalbankTransferredAmount,BT1CalbankTransferredAmount,BT2CalbankTransferredAmount,
PT1CalbankTransferredAmount,PT2CalbankTransferredAmount,
//Tellers OTHER BANKS Deposits Middlewares
AT1OtherBTransferredAmount,AT2OtherBTransferredAmount,BT1OtherBTransferredAmount,BT2OtherBTransferredAmount,
PT1OtherBTransferredAmount,PT2OtherBTransferredAmount,
//Tellers COMMISSION Deposits Middlewares
A1Com,A2Com,B1Com,B2Com,P1Com,P2Com,
//Superuser Total MoMo Entries For Each Teller Deposits and the Differences Middlewares
SA1M,SA2M,SB1M,SB2M,SP1M,SP2M,STTM,SA1MDFF,SA2MDFF,SB1MDFF,SB2MDFF,SP1MDFF,SP2MDFF,
//Superuser Total ECOBANK Entries For Each Teller Deposits and the Differences Middlewares
SA1EC,SA2EC,SB1EC,SB2EC,SP1EC,SP2EC,TEtfat,SA1EDFF,SA2EDFF,SB1EDFF,SB2EDFF,SP1EDFF,SP2EDFF,
//Superuser Total Fidelity Entries For Each Teller Deposits and the Differences Middlewares
SA1FC,SA2FC,SB1FC,SB2FC,SP1FC,SP2FC,SA1FDFF,SA2FDFF,SB1FDFF,SB2FDFF,SP1FDFF,SP2FDFF,
//Superuser Total Calbank Entries For Each Teller Deposits and the Differences Middlewares
SA1CC,SA2CC,SB1CC,SB2CC,SP1CC,SP2CC,SA1CDFF,SA2CDFF,SB1CDFF,SB2CDFF,SP1CDFF,SP2CDFF,
//Superuser Total Other Banks Entries For Each Teller Deposits and the Differences Middlewares
SA1OC,SA2OC,SB1OC,SB2OC,SP1OC,SP2OC,SA1ODFF,SA2ODFF,SB1ODFF,SB2ODFF,SP1ODFF,SP2ODFF,
//Superuser Total Commission Entries For Each Teller Deposits and the Differences Middlewares
STTOB,SA1CMM,SA2CMM,SB1CMM,SB2CMM,SP1CMM,SP2CMM,SA1CMMDFF,SA2CMMDFF,SB1CMMDFF,SB2CMMDFF,SP1CMMDFF,SP2CMMDFF
,(req, res) => {
    res.render('superuser2.ejs',{ 
      Mobcl: req.Mobcl,Ecash: req.Ecash,Mtfa: req.Mtfa,
      mcA1: req.mcA1,mcA2: req.mcA2,mcB1: req.mcB1,mcB2: req.mcB2,mcP1: req.mcP1,mcP2: req.mcP2,mct: req.mct
      ,Mcbl: req.Mcbl,Fobl: req.Fobl,Fecas: req.Fecas,
      Ftfa: req.Ftfa,Fcbl: req.Fcbl,E1obl: req.E1obl,E2obl: req.E2obl,E3obl: req.E3obl,E4obl: req.E4obl,E1cas: req.E1cas,
      E2cas: req.E2cas,E3cas: req.E3cas,E4cas: req.E4cas,E1tfa: req.E1tfa,E2tfa: req.E2tfa,E3tfa: req.E3tfa,E4tfa: req.E4tfa,
      E1cbl: req.E1cbl,E2cbl: req.E2cbl,E3cbl: req.E3cbl,E4cbl: req.E4cbl,Cobl: req.Cobl,Cecas: req.Cecas,Ctfa: req.Ctfa,
      Ccbl: req.Ccbl,
      E1ot: req.E1ot,E2ot: req.E2ot,E3ot: req.E3ot,E4ot: req.E4ot,ETot: req.ETot,OtEc: req.OtEc,omtn: req.omtn,
      FidWd: req.FidWd,TEtfa: req.TEtfa,spcbl: req.spcbl,spmbl: req.spmbl,spfbl: req.spfbl,se1bl: req.se1bl,se2bl: req.se2bl,
      se3bl: req.se3bl,se4bl: req.se4bl,
      //Tellers MTN MOMO EJS Display Request Variables
      AT1transferredAmount: req.AT1transferredAmount,AT2transferredAmount: req.AT2transferredAmount,
      BT1transferredAmount: req.BT1transferredAmount,BT2transferredAmount: req.BT2transferredAmount,
      PT1transferredAmount: req.PT1transferredAmount,PT2transferredAmount: req.PT2transferredAmount,
      //Tellers ECOBANK EJS Display Request Variables
      AT1EtransferredAmount: req.AT1EtransferredAmount,AT2EtransferredAmount: req.AT2EtransferredAmount,
      BT1EtransferredAmount: req.BT1EtransferredAmount,BT2EtransferredAmount: req.BT2EtransferredAmount,
      PT1EtransferredAmount: req.PT1EtransferredAmount,PT2EtransferredAmount: req.PT2EtransferredAmount,
      //Tellers FIDELITY EJS Display Request Variables
      AT1FtransferredAmount: req.AT1FtransferredAmount,AT2FtransferredAmount: req.AT2FtransferredAmount,
      BT1FtransferredAmount: req.BT1FtransferredAmount,BT2FtransferredAmount: req.BT2FtransferredAmount,
      PT1FtransferredAmount: req.PT1FtransferredAmount,PT2FtransferredAmount: req.PT2FtransferredAmount,
      //Tellers CALBANK EJS Display Request Variables
      AT1CtransferredAmount: req.AT1CtransferredAmount,AT2CtransferredAmount: req.AT2CtransferredAmount,
      BT1CtransferredAmount: req.BT1CtransferredAmount,BT2CtransferredAmount: req.BT2CtransferredAmount,
      PT1CtransferredAmount: req.PT1CtransferredAmount,PT2CtransferredAmount: req.PT2CtransferredAmount,
      //Tellers OTHER BANKS EJS Display Request Variables
      AT1ObtransferredAmount: req.AT1ObtransferredAmount,AT2ObtransferredAmount: req.AT2ObtransferredAmount,
      BT1ObtransferredAmount: req.BT1ObtransferredAmount,BT2ObtransferredAmount: req.BT2ObtransferredAmount,
      PT1ObtransferredAmount: req.PT1ObtransferredAmount,PT2ObtransferredAmount: req.PT2ObtransferredAmount,
      //Tellers COMMISSION EJS Display Request Variables
      A1Comm:req.AmountA1Comm,A2Comm:req.AmountA2Comm,B1Comm:req.AmountB1Comm,B2Comm:req.AmountB2Comm,P1Comm:req.AmountP1Comm,
      P2Comm:req.AmountP2Comm,
      //Superuser Total MoMo Entries For Each Teller Deposits And The Differences EJS Display Request Variables
      sa1mo: req.sa1mo,sa2mo: req.sa2mo,sb1mo: req.sb1mo,sb2mo: req.sb2mo,sp1mo: req.sp1mo,sp2mo: req.sp2mo,sttmo: req.sttmo,
      sa1mdf: req.sa1mdf,sa2mdf: req.sa2mdf,sb1mdf: req.sb1mdf,sb2mdf: req.sb2mdf,sp1mdf: req.sp1mdf,sp2mdf: req.sp2mdf,
      //Superuser Total  Ecobank Entries For Each Teller Deposits And The Differences EJS Display Request Variables
      sa1e: req.sa1e,sa2e: req.sa2e,sb1e: req.sb1e,sb2e: req.sb2e,sp1e: req.sp1e,sp2e: req.sp2e,sa1edf: req.sa1edf,
      sa2edf: req.sa2edf,sb1edf: req.sb1edf,sb2edf: req.sb2edf,sp1edf: req.sp1edf,sp2edf: req.sp2edf,
      //Superuser Total  Fidelity Entries For Each Teller Deposits And The Differences EJS Display Request Variables
      sa2f: req.sa2f,sa1f:req.sa1f,sb1f: req.sb1f,sb2f: req.sb2f,sp1f: req.sp1f,sp2f: req.sp2f,sa1fdf: req.sa1fdf,
      sa2fdf: req.sa2fdf,sb1fdf: req.sb1fdf,sb2fdf: req.sb2fdf,sp1fdf: req.sp1fdf, sp2fdf: req.sp2fdf,
      //Superuser Total  Calbank Entries For Each Teller Deposits And The Differences EJS Display Request Variables
      sa1c: req.sa1c,sa2c: req.sa2c,sb1c: req.sb1c,sb2c: req.sb2c,sp1c: req.sp1c,sp2c: req.sp2c,sa1cdf: req.sa1cdff,
      sa2cdf: req.sa2cdf,sb1cdf: req.sb1cdf,sb2cdf: req.sb2cdf,sp1cdf: req.sp1cdf,sp2cdf: req.sp2cdf,
      //Superuser Total  Other Banks Entries For Each Teller Deposits And The Differences EJS Display Request Variables
      sa1o: req.sa1o,sa2o: req.sa2o,sb1o: req.sb1c,sb2o: req.sb2o,sp1o: req.sp1o,sp2o: req.sp2o,sa1odf: req.sa1odf,
      sa2odf: req.sa2odf,sb1odf: req.sb1odf,sb2odf: req.sb2odf,sp1odf: req.sp1odf,sp2odf: req.sp2odf,
      //Superuser Total  Commission Entries For Each Teller Deposits And The Differences EJS Display Request Variables
      sttb: req.sttb,sa1cm: req.sa1cm,sa2cm: req.sa2cm,sb1cm: req.sb1cm,sb2cm: req.sb2cm,sp1cm: req.sp1cm,sp2cm: req.sp2cm,
      sa1cmdf: req.sa1cmdf,sa2cmdf: req.sa2cmdf,sb1cmdf: req.sb1cmdf,sb2cmdf: req.sb2cmdf,sp1cmdf: req.sp1cmdf,
      sp2cmdf: req.sp2cmdf  
    });
});

app.get('/Withdrawals',checkAuthenticated, 
//Aiyinase Teller 1 Withdrawal Middlewares
A1MoMoC,A1GmC,AtmA1,A1Voda,A1Ec,A1Ezc,A1susuC,A1RemC,A1VdWm,A1EWm,A1MTNm,A1susuM,A1Gmm,A1Atmm,A1Ezm
,A1Rem,A1Com,A1ctb,A1Ex,A1CR,A1TCos,A1TAM,A1ActW,AT1TotalAmountTransf
//Aiyinase Teller 2 Withdrawal Middlewares
,A2MoMoC,A2GmC,AtmA2,A2Voda,A2Ec,A2Ezc,A2susuC,A2RemC,A2VdWm,A2EWm,A2MTNm,A2susuM,A2Gmm,A2Atmm,A2Ezm,A2Rem,A2Com,
A2ctb,A2Ex,A2CR,A2TCos,A2TAM,A2ActW,
//Bogoso Teller 1 Withdrawal Middlewares
B1MoMoC,B1GmC,AtmB1,B1Voda,B1Ec,B1Ezc,B1susuC,B1RemC,B1VdWm,B1EWm,B1MTNm,B1susuM,B1Gmm,B1Atmm,B1Ezm,B1Rem,B1Com,
B1ctb,B1Ex,B1CR,B1TCos,B1TAM,B1ActW,
//Bogoso Teller 1 Withdrawal Middlewares
B2MoMoC,B2GmC,AtmB2,B2Voda,B2Ec,B2Ezc,B2susuC,B2RemC,B2VdWm,B2EWm,B2MTNm,B2susuM,B2Gmm,B2Atmm,B2Ezm,B2Rem,B2Com,
B2ctb,B2Ex,B2CR,B2TCos,B2TAM,B2ActW,
//Prestea Teller 1 Withdrawal Middlewares
P1MoMoC,P1GmC,AtmP1,P1Voda,P1Ec,P1Ezc,P1susuC,P1RemC,P1VdWm,P1EWm,P1MTNm,P1susuM,P1Gmm,P1Atmm,P1Ezm,P1Rem,P1Com,
P1ctb,P1Ex,P1CR,P1TCos,P1TAM,P1ActW,
//Prestea Teller 2 Withdrawal Middlewares
P2MoMoC,P2GmC,AtmP2,P2Voda,P2Ec,P2Ezc,P2susuC,P2RemC,P2VdWm,P2EWm,P2MTNm,P2susuM,P2Gmm,P2Atmm,P2Ezm,P2Rem,P2Com,
P2ctb,P2Ex,P2CR,P2TCos,P2TAM,P2ActW,
//Aiyinase Teller 1 Deposits Middlewares
AT1MoMoDocuments,AT1VodaDocuments,AT1VodaTransferredAmount,AT1countOtherBDocuments,
AT1OtherBTransferredAmount,AT1fetchInitialPCash,AT1TotalCashColltd,AT1MoMoTransferredAmount,AT1countFDocuments,AT1FidelityTransferredAmount,
AT1countEDocuments,AT1EcobankTransferredAmount,AT1countCDocuments,AT1CalbankTransferredAmount,AT1countSuSuDocuments,
AT1SusuTransferredAmount,AT1TotalCostumers,AT1TotalAmountTransf,AT1TotalcPcash,
//Aiyinase Teller 2 Deposits Middlewares
AT2MoMoDocuments,AT2VodaDocuments,AT2VodaTransferredAmount,AT2countOtherBDocuments,AT2OtherBTransferredAmount,
AT2fetchInitialPCash,AT2TotalCashColltd,AT2MoMoTransferredAmount,AT2countFDocuments,AT2FidelityTransferredAmount,
AT2countEDocuments,AT2EcobankTransferredAmount,AT2countCDocuments,AT2CalbankTransferredAmount,AT2countSuSuDocuments,
AT2SusuTransferredAmount,AT2TotalCostumers,AT2TotalAmountTransf,AT2TotalcPcash,
//Bogoso Teller 1 Deposits Middlewares
BT1MoMoDocuments,BT1VodaDocuments,BT1VodaTransferredAmount,BT1countOtherBDocuments,BT1OtherBTransferredAmount,
BT1fetchInitialPCash,BT1TotalCashColltd,BT1MoMoTransferredAmount,BT1countFDocuments,BT1FidelityTransferredAmount,
BT1countEDocuments,BT1EcobankTransferredAmount,BT1countCDocuments,BT1CalbankTransferredAmount,BT1countSuSuDocuments,
BT1SusuTransferredAmount,BT1TotalCostumers,BT1TotalAmountTransf,BT1TotalcPcash,
//Bogoso Teller 2 Deposits Middlewares
BT2MoMoDocuments,BT2VodaDocuments,BT2VodaTransferredAmount,BT2countOtherBDocuments,BT2OtherBTransferredAmount,
BT2fetchInitialPCash,BT2TotalCashColltd,BT2MoMoTransferredAmount,BT2countFDocuments,BT2FidelityTransferredAmount,
BT2countEDocuments,BT2EcobankTransferredAmount,BT2countCDocuments,BT2CalbankTransferredAmount,BT2countSuSuDocuments,
BT2SusuTransferredAmount,BT2TotalCostumers,BT2TotalAmountTransf,BT2TotalcPcash,
//Prestea Teller 1 Deposits Middlewares
PT1MoMoDocuments,PT1VodaDocuments,PT1VodaTransferredAmount,PT1countOtherBDocuments,PT1OtherBTransferredAmount,
PT1fetchInitialPCash,PT1TotalCashColltd,PT1MoMoTransferredAmount,PT1countFDocuments,PT1FidelityTransferredAmount,
PT1countEDocuments,PT1EcobankTransferredAmount,PT1countCDocuments,PT1CalbankTransferredAmount,PT1countSuSuDocuments,
PT1SusuTransferredAmount,PT1TotalCostumers,PT1TotalAmountTransf,PT1TotalcPcash,
//Prestea Teller 2 Deposits Middlewares
PT2MoMoDocuments,PT2VodaDocuments,PT2VodaTransferredAmount,PT2countOtherBDocuments,PT2OtherBTransferredAmount,
PT2fetchInitialPCash,PT2TotalCashColltd,PT2MoMoTransferredAmount,PT2countFDocuments,PT2FidelityTransferredAmount,
PT2countEDocuments,PT2EcobankTransferredAmount,PT2countCDocuments,PT2CalbankTransferredAmount,PT2countSuSuDocuments,
PT2SusuTransferredAmount,PT2TotalCostumers,PT2TotalAmountTransf,PT2TotalcPcash,
//Other Deposits Middlewares
A1ACOST,A1BLC,A2ACOST,A2BLC,B1ACOST,B1BLC,B2ACOST,B2BLC,P1ACOST,P1BLC,P2ACOST,P2BLC,
//All Tellers Total Middlewares
TTMWD,TTVWD,TTSWD,TTEWD,TTGWD,TTAWD,TTEZWD,TTRWD,TTCBK,TTWCO,TTPCR,TTAMTW,TTEXP,TTCOM,TTACTW
,(req, res) => {
  res.render('admin2.ejs',{
    //Aiyinase Teller 1 Withdrawal EJS Display Request Variables
    A1Mc:req.WMoMoA1Ct,A1Gm:req.docA1Gm,AtmA1:req.docAtmA1,A1VdC:req.docA1VdC,A1E:req.docA1E,A1Ez:req.docA1Ez,A1Susud:req.docA1Susud,
    A1Rd:req.docA1Rd,A1VWm:req.AmountA1VW,A1Em:req.AmountA1E,A1MTN:req.AmountA1MTN,A1susu:req.AmountA1susu,A1Gmm:req.AmountA1Gm,
    A1Atm:req.AmountA1Atm,A1Ezmm:req.AmountA1Ezmm,A1Remm:req.AmountA1Remm,A1Comm:req.AmountA1Comm,A1Load:req.LoadingA1,
    A1Exp:req.AmountA1Exp,A1cashR:req.A1cashRm,A1TCost:req.TotalA1Cost,A1TM:req.A1WAmount,A1AW:req.A1AWAmount,
    //Aiyinase Teller 2 Withdrawal EJS Display Request Variables
    A2Mc:req.WMoMoA2Ct,A2Gm:req.docA2Gm,AtmA2:req.docAtmA2,A2VdC:req.docA2VdC,A2E:req.docA2E,A2Ez:req.docA2Ez,A2Susud:req.docA2Susud,
    A2Rd:req.docA2Rd,A2VWm:req.AmountA2VW,A2Em:req.AmountA2E,A2MTN:req.AmountA2MTN,A2susu:req.AmountA2susu,A2Gmm:req.AmountA2Gm,
    A2Atm:req.AmountA2Atm,A2Ezmm:req.AmountA2Ezmm,A2Remm:req.AmountA2Remm,A2Comm:req.AmountA2Comm,A2Load:req.LoadingA2,
    A2Exp:req.AmountA2Exp,A2cashR:req.A2cashRm,A2TCost:req.TotalA2Cost,A2TM:req.A2WAmount,A2AW:req.A2AWAmount,
    //Bogoso Teller 1 Withdrawal EJS Display Request Variables
    B1Mc:req.WMoMoB1Ct,B1Gm:req.docB1Gm,AtmB1:req.docAtmB1,B1VdC:req.docB1VdC,B1E:req.docB1E,B1Ez:req.docB1Ez,B1Susud:req.docB1Susud,
    B1Rd:req.docB1Rd,B1VWm:req.AmountB1VW,B1Em:req.AmountB1E,B1MTN:req.AmountB1MTN,B1susu:req.AmountB1susu,B1Gmm:req.AmountB1Gm,
    B1Atm:req.AmountB1Atm,B1Ezmm:req.AmountB1Ezmm,B1Remm:req.AmountB1Remm,B1Comm:req.AmountB1Comm,B1Load:req.LoadingB1,
    B1Exp:req.AmountB1Exp,B1cashR:req.B1cashRm,B1TCost:req.TotalB1Cost,B1TM:req.B1WAmount,B1AW:req.B1AWAmount,
    //Bogoso Teller 2 Withdrawal EJS Display Request Variables
    B2Mc:req.WMoMoB2Ct,B2Gm:req.docB2Gm,AtmB2:req.docAtmB2,B2VdC:req.docB2VdC,B2E:req.docB2E,B2Ez:req.docB2Ez,B2Susud:req.docB2Susud,
    B2Rd:req.docB2Rd,B2VWm:req.AmountB2VW,B2Em:req.AmountB2E,B2MTN:req.AmountB2MTN,B2susu:req.AmountB2susu,B2Gmm:req.AmountB2Gm,
    B2Atm:req.AmountB2Atm,B2Ezmm:req.AmountB2Ezmm,B2Remm:req.AmountB2Remm,B2Comm:req.AmountB2Comm,B2Load:req.LoadingB2,
    B2Exp:req.AmountB2Exp,B2cashR:req.B2cashRm,B2TCost:req.TotalB2Cost,B2TM:req.B2WAmount,B2AW:req.B2AWAmount,
    //Prestea Teller 1 Withdrawal EJS Display Request Variables
    P1Mc:req.WMoMoP1Ct,P1Gm:req.docP1Gm,AtmP1:req.docAtmP1,P1VdC:req.docP1VdC,P1E:req.docP1E,P1Ez:req.docP1Ez,P1Susud:req.docP1Susud,
    P1Rd:req.docP1Rd,P1VWm:req.AmountP1VW,P1Em:req.AmountP1E,P1MTN:req.AmountP1MTN,P1susu:req.AmountP1susu,P1Gmm:req.AmountP1Gm,
    P1Atm:req.AmountP1Atm,P1Ezmm:req.AmountP1Ezmm,P1Remm:req.AmountP1Remm,P1Comm:req.AmountP1Comm,P1Load:req.LoadingP1,
    P1Exp:req.AmountP1Exp,P1cashR:req.P1cashRm,P1TCost:req.TotalP1Cost,P1TM:req.P1WAmount,P1AW:req.P1AWAmount,
    //Prestea Teller 2 Withdrawal EJS Display Request Variables
    P2Mc:req.WMoMoP2Ct,P2Gm:req.docP2Gm,AtmP2:req.docAtmP2,P2VdC:req.docP2VdC,P2E:req.docP2E,P2Ez:req.docP2Ez,P2Susud:req.docP2Susud,
    P2Rd:req.docP2Rd,P2VWm:req.AmountP2VW,P2Em:req.AmountP2E,P2MTN:req.AmountP2MTN,P2susu:req.AmountP2susu,P2Gmm:req.AmountP2Gm,
    P2Atm:req.AmountP2Atm,P2Ezmm:req.AmountP2Ezmm,P2Remm:req.AmountP2Remm,P2Comm:req.AmountP2Comm,P2Load:req.LoadingP2,
    P2Exp:req.AmountP2Exp,P2cashR:req.P2cashRm,P2TCost:req.TotalP2Cost,P2TM:req.P2WAmount,P2AW:req.P2AWAmount,
   //Other Deposits EJS Display Request Variables
   AT1TTotalcPcash: req.AT1TTotalcPcash,AT2TTotalcPcash: req.AT2TTotalcPcash,BT1TTotalcPcash: req.BT1TTotalcPcash,
   BT2TTotalcPcash: req.BT2TTotalcPcash,PT1TTotalcPcash: req.PT1TTotalcPcash,PT2TTotalcPcash: req.PT2TTotalcPcash,
   a1acos: req.a1acos,a1bl: req.a1bl,a2acos: req.a2acos,a2bl: req.a2bl,b1acos: req.b1acos,b1bl: req.b1bl,
   b2acos: req.b2acos,b2bl: req.b2bl,p1acos: req.p1acos,p1bl: req.p1bl,p2acos: req.p2acos,p2bl: req.p2bl,
   //All Tellers Total EJS Display Request Variables
   ttmw: req.ttmw,ttvw: req.ttvw,ttsw: req.ttsw,ttew: req.ttew,ttgw: req.ttgw,ttaw: req.ttaw,ttezw: req.ttezw,
   ttrw: req.ttrw,ttcb: req.ttcb,ttwc: req.ttwc,ttcr: req.ttcr,ttatw: req.ttatw,texp: req.texp,tcom: req.tcom,
   ttact: req.ttact
  });
});

app.get('/Deposits',checkAuthenticated,
  //Aiyinase Teller 1 Deposits Middlewares
AT1MoMoDocuments,AT1VodaDocuments,AT1VodaTransferredAmount,AT1countOtherBDocuments,
AT1OtherBTransferredAmount,AT1fetchInitialPCash,AT1TotalCashColltd,AT1MoMoTransferredAmount,AT1countFDocuments,AT1FidelityTransferredAmount,
AT1countEDocuments,AT1EcobankTransferredAmount,AT1countCDocuments,AT1CalbankTransferredAmount,AT1countSuSuDocuments,
AT1SusuTransferredAmount,AT1TotalCostumers,AT1TotalAmountTransf,AT1TotalcPcash,
//Aiyinase Teller 2 Deposits Middlewares
AT2MoMoDocuments,AT2VodaDocuments,AT2VodaTransferredAmount,AT2countOtherBDocuments,AT2OtherBTransferredAmount,
AT2fetchInitialPCash,AT2TotalCashColltd,AT2MoMoTransferredAmount,AT2countFDocuments,AT2FidelityTransferredAmount,
AT2countEDocuments,AT2EcobankTransferredAmount,AT2countCDocuments,AT2CalbankTransferredAmount,AT2countSuSuDocuments,
AT2SusuTransferredAmount,AT2TotalCostumers,AT2TotalAmountTransf,AT2TotalcPcash,
//Bogoso Teller 1 Deposits Middlewares
BT1MoMoDocuments,BT1VodaDocuments,BT1VodaTransferredAmount,BT1countOtherBDocuments,BT1OtherBTransferredAmount,
BT1fetchInitialPCash,BT1TotalCashColltd,BT1MoMoTransferredAmount,BT1countFDocuments,BT1FidelityTransferredAmount,
BT1countEDocuments,BT1EcobankTransferredAmount,BT1countCDocuments,BT1CalbankTransferredAmount,BT1countSuSuDocuments,
BT1SusuTransferredAmount,BT1TotalCostumers,BT1TotalAmountTransf,BT1TotalcPcash,
//Bogoso Teller 2 Deposits Middlewares
BT2MoMoDocuments,BT2VodaDocuments,BT2VodaTransferredAmount,BT2countOtherBDocuments,BT2OtherBTransferredAmount,
BT2fetchInitialPCash,BT2TotalCashColltd,BT2MoMoTransferredAmount,BT2countFDocuments,BT2FidelityTransferredAmount,
BT2countEDocuments,BT2EcobankTransferredAmount,BT2countCDocuments,BT2CalbankTransferredAmount,BT2countSuSuDocuments,
BT2SusuTransferredAmount,BT2TotalCostumers,BT2TotalAmountTransf,BT2TotalcPcash,
//Prestea Teller 1 Deposits Middlewares
PT1MoMoDocuments,PT1VodaDocuments,PT1VodaTransferredAmount,PT1countOtherBDocuments,PT1OtherBTransferredAmount,
PT1fetchInitialPCash,PT1TotalCashColltd,PT1MoMoTransferredAmount,PT1countFDocuments,PT1FidelityTransferredAmount,
PT1countEDocuments,PT1EcobankTransferredAmount,PT1countCDocuments,PT1CalbankTransferredAmount,PT1countSuSuDocuments,
PT1SusuTransferredAmount,PT1TotalCostumers,PT1TotalAmountTransf,PT1TotalcPcash,
//Prestea Teller 2 Deposits Middlewares
PT2MoMoDocuments,PT2VodaDocuments,PT2VodaTransferredAmount,PT2countOtherBDocuments,PT2OtherBTransferredAmount,
PT2fetchInitialPCash,PT2TotalCashColltd,PT2MoMoTransferredAmount,PT2countFDocuments,PT2FidelityTransferredAmount,
PT2countEDocuments,PT2EcobankTransferredAmount,PT2countCDocuments,PT2CalbankTransferredAmount,PT2countSuSuDocuments,
PT2SusuTransferredAmount,PT2TotalCostumers,PT2TotalAmountTransf,PT2TotalcPcash,
//Other Deposits Middlewares
TTMDP,TTVDP,TTSDP,TTEDP,TTFDP,TTCDP,TTODP,TTDCO,TTAFR,TTPCC,TTINT,TTDPT,
(req, res) => {
    res.render('balance.ejs',{ 
      //Aiyinase Teller 1 Deposits EJS Display Request Variables
      AT1count: req.AT1documentsCount,AT1Vcount: req.AT1documentsVCount,AT1VodatransferredAmount: req.AT1VodatransferredAmount,
      AT1odcount: req.AT1documentsodCount,AT1ObtransferredAmount: req.AT1ObtransferredAmount,AT1InitialPCash: req.AT1InitialPCash,
      AT1totalColtdPcash: req.AT1totalColtdPcash,AT1transferredAmount: req.AT1transferredAmount,AT1countF: req.AT1documentsCountF,
      AT1FtransferredAmount: req.AT1FtransferredAmount,AT1countE: req.AT1documentsCountE,AT1EtransferredAmount: req.AT1EtransferredAmount,
      AT1countC: req.AT1documentsCountC,AT1CtransferredAmount: req.AT1CtransferredAmount,AT1countsusu: req.AT1documentsCountsusu,
      AT1SutransferredAmount: req.AT1SutransferredAmount,AT1TotalCostumers: req.AT1TotalCostumers,AT1TotalAmoutTrans: req.AT1TotalAmoutTrans,
      AT1TTotalcPcash: req.AT1TTotalcPcash, 
      //Aiyinase Teller 2 Deposits EJS Display Request Variables
      AT2count : req.AT2documentsCount,AT2Vcount: req.AT2documentsVCount,AT2VodatransferredAmount: req.AT2VodatransferredAmount,
      AT2odcount: req.AT2documentsodCount,AT2ObtransferredAmount: req.AT2ObtransferredAmount,AT2InitialPCash: req.AT2InitialPCash,
      AT2totalColtdPcash: req.AT2totalColtdPcash,AT2transferredAmount: req.AT2transferredAmount,AT2countF: req.AT2documentsCountF,
      AT2FtransferredAmount: req.AT2FtransferredAmount,AT2countE: req.AT2documentsCountE,AT2EtransferredAmount: req.AT2EtransferredAmount,
      AT2countC: req.AT2documentsCountC,AT2CtransferredAmount: req.AT2CtransferredAmount,AT2countsusu: req.AT2documentsCountsusu,
      AT2SutransferredAmount: req.AT2SutransferredAmount,AT2TotalCostumers: req.AT2TotalCostumers,AT2TotalAmoutTrans: req.AT2TotalAmoutTrans,
      AT2TTotalcPcash: req.AT2TTotalcPcash,
      //Bogoso Teller 1 Deposits EJS Display Request Variables
      BT1count: req.BT1documentsCount,BT1Vcount: req.BT1documentsVCount,BT1VodatransferredAmount: req.BT1VodatransferredAmount,
      BT1odcount: req.BT1documentsodCount,BT1ObtransferredAmount: req.BT1ObtransferredAmount,BT1InitialPCash: req.BT1InitialPCash,
      BT1totalColtdPcash: req.BT1totalColtdPcash,BT1transferredAmount: req.BT1transferredAmount,BT1countF: req.BT1documentsCountF,
      BT1FtransferredAmount: req.BT1FtransferredAmount,BT1countE: req.BT1documentsCountE,BT1EtransferredAmount: req.BT1EtransferredAmount,
      BT1countC: req.BT1documentsCountC,BT1CtransferredAmount: req.BT1CtransferredAmount,BT1countsusu: req.BT1documentsCountsusu,
      BT1SutransferredAmount: req.BT1SutransferredAmount,BT1TotalCostumers: req.BT1TotalCostumers,BT1TotalAmoutTrans: req.BT1TotalAmoutTrans,
      BT1TTotalcPcash: req.BT1TTotalcPcash,
      //Bogoso Teller 2 Deposits EJS Display Request Variables
      BT2count: req.BT2documentsCount,BT2Vcount: req.BT2documentsVCount,BT2VodatransferredAmount: req.BT2VodatransferredAmount,
      BT2odcount: req.BT2documentsodCount,BT2ObtransferredAmount: req.BT2ObtransferredAmount,BT2InitialPCash: req.BT2InitialPCash,
      BT2totalColtdPcash: req.BT2totalColtdPcash,BT2transferredAmount: req.BT2transferredAmount,BT2countF: req.BT2documentsCountF,
      BT2FtransferredAmount: req.BT2FtransferredAmount,BT2countE: req.BT2documentsCountE,BT2EtransferredAmount: req.BT2EtransferredAmount,
      BT2countC: req.BT2documentsCountC,BT2CtransferredAmount: req.BT2CtransferredAmount,BT2countsusu: req.BT2documentsCountsusu,
      BT2SutransferredAmount: req.BT2SutransferredAmount,BT2TotalCostumers: req.BT2TotalCostumers,BT2TotalAmoutTrans: req.BT2TotalAmoutTrans,
      BT2TTotalcPcash: req.BT2TTotalcPcash,
      //Prestea Teller 1 Deposits EJS Display Request Variables
      PT1count: req.PT1documentsCount,PT1Vcount: req.PT1documentsVCount,PT1VodatransferredAmount: req.PT1VodatransferredAmount,
      PT1odcount: req.PT1documentsodCount,PT1ObtransferredAmount: req.PT1ObtransferredAmount,PT1InitialPCash: req.PT1InitialPCash,
      PT1totalColtdPcash: req.PT1totalColtdPcash,PT1transferredAmount: req.PT1transferredAmount,PT1countF: req.PT1documentsCountF,
      PT1FtransferredAmount: req.PT1FtransferredAmount,PT1countE: req.PT1documentsCountE,PT1EtransferredAmount: req.PT1EtransferredAmount,
      PT1countC: req.PT1documentsCountC,PT1CtransferredAmount: req.PT1CtransferredAmount,PT1countsusu: req.PT1documentsCountsusu,
      PT1SutransferredAmount: req.PT1SutransferredAmount,PT1TotalCostumers: req.PT1TotalCostumers,PT1TotalAmoutTrans: req.PT1TotalAmoutTrans,
      PT1TTotalcPcash: req.PT1TTotalcPcash,
      //Prestea Teller 2 Deposits EJS Display Request Variables
      PT2count: req.PT2documentsCount,PT2Vcount: req.PT2documentsVCount,PT2VodatransferredAmount: req.PT2VodatransferredAmount,
      PT2odcount: req.PT2documentsodCount,PT2ObtransferredAmount: req.PT2ObtransferredAmount,PT2InitialPCash: req.PT2InitialPCash,
      PT2totalColtdPcash: req.PT2totalColtdPcash,PT2transferredAmount: req.PT2transferredAmount,PT2countF: req.PT2documentsCountF,
      PT2FtransferredAmount: req.PT2FtransferredAmount,PT2countE: req.PT2documentsCountE,PT2EtransferredAmount: req.PT2EtransferredAmount,
      PT2countC: req.PT2documentsCountC,PT2CtransferredAmount: req.PT2CtransferredAmount,PT2countsusu: req.PT2documentsCountsusu,
      PT2SutransferredAmount: req.PT2SutransferredAmount,PT2TotalCostumers: req.PT2TotalCostumers,PT2TotalAmoutTrans: req.PT2TotalAmoutTrans,
      PT2TTotalcPcash: req.PT2TTotalcPcash,
      //Other Deposits EJS Display Request Variables
      ttmd: req.ttmd,ttvd: req.ttvd,ttsd: req.ttsd,tted: req.tted,ttfd: req.ttfd,ttcd: req.ttcd,ttod: req.ttod,ttdc: req.ttdc,
      ttaf: req.ttaf,ttcc: req.ttcc,ttin: req.ttin,ttdp: req.ttdp
    });
});

app.get('/',checkNotAuthenticated ,(req, res) => {
    res.render('index.ejs' );
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/')
}
  
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      if (req.user.usertype === 'Administrator') {
          return res.redirect('/admin');
      } else if (req.user.usertype === 'Superuser') {
          return res.redirect('/superuser');
      } else if (req.user.usertype === 'Invites') {
          return res.redirect('/superuser2');
      } else {
          return res.redirect('/user');
      }
  }
  next();
}

function checkRole(role) {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.usertype === role) {
        return next();
      } else if (req.user.usertype === 'Administrator') {
        return res.redirect('/admin');
      } else if (req.user.usertype === 'Superuser') {
        return res.redirect('/superuser');
      } else if (req.user.usertype === 'Invites') {
        return res.redirect('/superuser2');
      } else {
        return res.redirect('/user');
      }
    }
    next();
  };
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

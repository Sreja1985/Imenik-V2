import { useState } from "react";
import { RoutesEnum } from "../../routsEnum";
import JumpTop from "../../components/Shared/JumpTop";


function SearchByName() {
  return (
    <section className="page">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <p>
            1. Osobit slijed riječi i oznaka kakva rukopisa ili knjige, odn.
            sama knjiga ili rukopis. O njegovoj autentičnosti i točnosti, odn.
            sukladnosti originalu, skrbi se zasebna filološka disciplina,
            tekstologija. U užem smislu, tekst je glavnina sadržaja kakve knjige
            ili izdanja, uz fusnote, glose, komentare, kazala i sl. U književnoj
            teoriji pojam teksta u osobitu je odnosu s pojmom djela. S jedne
            strane, pojam teksta sinoniman je pojmu književnog djela. Međutim,
            utjecajna književnokritička struja strukturalizma u drugoj polovici
            XX. st. odbacila je pojam djela, a za oznaku predmeta svojega
            bavljenja uzela širi pojam teksta: tekst je svaka struktura
            značenjskih elemenata koja očituje određeno jedinstvo. Tekst je
            stoga bilo što što se može »čitati«: umjetnička književnost, ali i
            strip, film, ples, slika ili skulptura, novinski članak itd. Time
            strukturalizam poništava granice između umjetničkih i neumjetničkih,
            vrijednih i trivijalnih, usmenih i pisanih, ali i jezičnih i
            nejezičnih tekstova. Za razliku od djela, jedinstvo kojega proizlazi
            iz autoriteta autorske namjere, žanra ili situacije nastanka, u tako
            određenom tekstu i autor i prikazani sadržaji i teme teksta postoje
            jedino kao funkcija teksta. Tekst dobiva koherentnost iz kodova koji
            ga stavljaju u odnos s ostalim označiteljskim praksama dotične
            kulture. Poststrukturalizam ipak takvu umreženost teksta drži
            razlogom nemogućnosti tekstovne cjelovitosti, koja je uvijek
            potkopana tragovima što ih u njem ostavljaju drugi tekstovi.
          </p>
          <p>
            2. U lingvistici, naziv za najvišu razinu organizacije jezičnog
            iskaza. Tekst je ograničen slijed jezičnih znakova koji je u sebi
            koherentan i koji kao cjelina ima prepoznatljivu komunikacijsku
            funkciju. To je svaka tvorevina koja se može pridružiti nekoj
            tekstnoj vrsti. Po nekim su lingv. teorijama tekst i diskurs
            istoznačnice, a po drugima se razlikuju. Neki smatraju tekst
            proizvodom, rezultatom diskursa, a drugi smatraju tekst
            apstrakcijom, a diskurs njegovim ostvarajem. Neki lingvisti tekstom
            nazivaju ono što je napisano, a diskursom ono što je izgovoreno.
            Pojam teksta često se nalazi i u definiciji rečenice, ako se tvrdi
            da je rečenica sintaktička jedinica kojoj je donja granica riječ, a
            gornja tekst (diskurs). Tekst se uvijek sastoji od jedne ili više
            rečenica. Ako se sastoji od više rečenica, one se po pravilima
            ustrojavaju u tekst. Postoje različiti odnosi koji rečenice povezuju
            u tekst. Ukupnost tih odnosa naziva se kohezijom ili koherentnošću.
            Kohezija uključuje povezivanje komponenata površinske strukture
            gramatičkim sredstvima i odnosi se na formalna vezna sredstva. Pri
            povezivanju rečenica u tekst dolazi do nekih preoblika kao što je
            zamjenjivanje imenica zamjenicama ili, ako su zalihosne, njihovim
            izostavljanjem. U najvažnije pojave tekstne koherentnosti ubrajaju
            se oblici ponavljanja, supstitucija (zamjena), pronominalizacija
            (zamjena zamjenicom), ponavljanje ili izostavljanje (elipsa). Kada
            se rečenice povezuju u tekst, često jedna kojom od svojih sastavnica
            upućuje na druge rečenice. Takvo se upućivanje naziva foričnošću.
            Anaforičnost je upućivanje prema naprijed (Marko ide u školu. On je
            učenik 1. razreda. – zamjenica on upućuje na Marko), a kataforičnost
            upućivanje prema nazad (Postupili su različito. Neki su otišli kući,
            drugi su ostali.). Različite jezične jedinice koje služe za
            povezivanje rečenica nazivaju se konektori. To su riječi ili skupine
            riječi koje služe za uspostavljanje odnosa prethodne rečenice sa
            sljedećom. Postoje ove vrste konektora: suprotni (npr. naprotiv, za
            razliku od toga, međutim), aditivi (npr. štoviše, usto, osim toga),
            zaključni (npr. dakle, prema tomu), vremenski (npr. nakon toga,
            zatim), prostorni (npr. ovdje, tako, time), dopusni (npr. unatoč
            tomu, ipak, usprkos tomu), pogodbeni (npr. u tom slučaju, inače),
            objasnidbeni (npr. naime, drugim riječima, točnije rečeno,
            jednostavnije rečeno) i drugi. Tekst redovito mora imati i istu
            temu, odn. tematsku strukturu. U nekim se lingv. smjerovima analiza
            teksta smatra najvažnijim ciljem jezičnih istraživanja. Tako se od
            1970-ih razvija tekstna lingvistika koja pridaje posebnu pozornost
            tekstualnosti, tj. određivanju značajka različitih tekstnih vrsta
            (npr. pozivnica, pismo, molba, žalba, osmrtnica, vijest, obavijest
            itd.).
          </p>
          
        </div>
        <div className="col-1"></div>
        <div className="col-1"><JumpTop /></div>
      </div>
    </section>
  );
}
export default SearchByName;

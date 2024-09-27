"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const advice = document.querySelector("#advice");
const adviceId = document.querySelector("#advice-id");
const contentDiv = document.querySelector(".content");
const diceBtn = document.querySelector(".dice");
const loader = document.querySelector(".loader");
class FetchAdvice {
    getAdvices() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch("https://api.adviceslip.com/advice");
                if (!res.ok) {
                    throw new Error("Failed to fetch advice");
                }
                const data = yield res.json();
                let { id, advice } = data.slip;
                return { id, advice };
            }
            catch (err) {
                console.log("Error fetching advice:", err);
                return { id: 0, advice: "Unable to fetch advice at the moment." };
            }
        });
    }
}
class View {
    viewAdvice(data) {
        const div = `     
        <div class="title">
          <h4>Advice <span id="advice-id">#${data.id}</span></h4>
        </div>
        <div class="text">
          <blockquote class="advice" id="advice">
            "${data.advice}"
          </blockquote>
        </div>
      
`;
        contentDiv.innerHTML = div;
    }
    showLoader() {
        contentDiv.innerHTML = '<div class="loader"></div>';
    }
}
const getAdvice = new FetchAdvice();
const view = new View();
diceBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    diceBtn.disabled = true;
    view.showLoader();
    try {
        const data = yield getAdvice.getAdvices();
        view.viewAdvice(data);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        diceBtn.disabled = false;
    }
}));

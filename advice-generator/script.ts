const advice = document.querySelector("#advice")! as HTMLQuoteElement;
const adviceId = document.querySelector("#advice-id")! as HTMLSpanElement;
const contentDiv = document.querySelector(".content")! as HTMLDivElement;
const diceBtn = document.querySelector(".dice")! as HTMLButtonElement;
const loader = document.querySelector(".loader")! as HTMLDivElement;

interface AdviceType {
  id: number;
  advice: string;
}

class FetchAdvice {
  async getAdvices(): Promise<AdviceType> {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) {
        throw new Error("Failed to fetch advice");
      }

      const data = await res.json();
      let { id, advice } = data.slip;
      return { id, advice };
    } catch (err) {
      console.log("Error fetching advice:", err);
      return { id: 0, advice: "Unable to fetch advice at the moment." };
    }
  }
}

class View {
  viewAdvice(data: AdviceType) {
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

diceBtn.addEventListener("click", async () => {
  diceBtn.disabled = true;
  view.showLoader();
  try {
    const data = await getAdvice.getAdvices();
    view.viewAdvice(data);
  } catch (err) {
    console.log(err);
  } finally {
    diceBtn.disabled = false;
  }
});

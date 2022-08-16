function first(elm) {
  return document.querySelector(elm)
}
function more(elm) {
  return document.querySelectorAll(elm)
}
let qoshish = first("#add"),
  modal = first(".modal"),
  form = first(".modal form"),
  input = more("input"),
  tbody = first('#malumot_body'),
  jonat = first(".jonat");
  malumot_name = first("#malumot_name"),
  form = first("form"),
  malumotlar = {},
  qiymat = null;

let dataStorage = JSON.parse(localStorage.getItem('malumotlar')) || [];

function localST_Func() {
  tbody.innerHTML = ""
  dataStorage = JSON.parse(localStorage.getItem('malumotlar')) || [];
  if(dataStorage.length == 0) {
    tbody.innerHTML = `<tr><td colspan='6' style='padding:15px' >Malumot topilmadi</td></tr>`
  }
  else {
    dataStorage.forEach((item, i) => {
      tbody.innerHTML +=`
        <tr>
          <td> ${i}  </td>
          <td> ${item.nom} </td>
          <td> ${item.about}  </td>
          <td> <span>${item.price}</span> $ </td>
          <td> <button id="del" onclick={deleteStorage(${i})} >delete</button>  </td>
          <td> <button id="edit"  onclick=(editStorage(${i})) >edit</button>  </td>
        </tr>
      `
    });
  }
}

localST_Func();

// modal oyna ko'rsatish uchun
function show() {
  modal.style.top = 0;
  form.style.top = 0;
}

// modal oyna yopish uchun
function closess() {
  modal.style.top = "-100%";
  form.style.top = "-100%";
}

qoshish.addEventListener("click", () => {
  show();
  malumot_name.innerHTML = "mahsulot qo'shish"
  jonat.innerHTML = "qo'shish";
  input.forEach((val) => {
    val.value = "";
  });
});

form.addEventListener("click", (e) => {
  e.stopPropagation();
});

modal.addEventListener("click", () => {
  closess();
});

// mahsulot qo'shish
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(qiymat === null) {
    if (localStorage.getItem("malumotlar")) {
      localStorage.setItem(
        "malumotlar",
        JSON.stringify([...JSON.parse(localStorage.getItem("malumotlar")), malumotlar])
      );
    } else {
      localStorage.setItem("malumotlar", JSON.stringify([malumotlar]));
    }
    e.target.reset();
    localST_Func();
  }
  else {
    if (localStorage.getItem("malumotlar")) {
      localStorage.setItem(
        "malumotlar",
        JSON.stringify([
          ...dataStorage.slice(0, qiymat),
          malumotlar,
          ...dataStorage.slice(qiymat + 1, dataStorage.length),
        ])
      );
    }
    e.target.reset();
    localST_Func();
    qiymat = null;
  }
  closess();
})
// kerakli malumotlarni input oynasiga kiritish
input.forEach((val) => {
  val.addEventListener("change", (e) => {
    malumotlar = {
      ...malumotlar,
      [e.target.name]: e.target.value,
    };
  });
});


// edit 
function editStorage(i) {
  show();
  malumot_name.innerHTML = "mahsulot tahrirlash"
  jonat.innerHTML = "tahrirlash";
  qiymat = i;
  input.forEach((val) => {
    val.value = dataStorage[i][val.name];
  });
}

// delete function
function deleteStorage(i) {
  console.log(dataStorage.slice(i, i + 1));
  localStorage.setItem(
    "malumotlar",
    JSON.stringify([
      ...dataStorage.slice(0, i),
      ...dataStorage.slice(i + 1, dataStorage.length),
    ])
  );
  localST_Func();
}
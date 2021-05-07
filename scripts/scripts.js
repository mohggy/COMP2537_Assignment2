"use strict";

const profileTemplate = ({ ID, firstName, lastName, email, age, job }) =>
  `
  <div class="box">
    <div id="input${ID}"></div>
    <p>${firstName}</p>
    <p>${lastName}</p>
    <p>${email}</p>
    <p>${age}</p>
    <p>${job}</p>
    <button data-id="${ID}" class="deleteProfileBtn">DELETE</button>
    <button data-id="${ID}"
            data-first="${firstName}"
            data-last="${lastName}"
            data-email="${email}"
            data-age="${age}"
            data-job="${job}"
            class="editProfileBtn">UPDATE</button>
  </div>
                `;
  
const resetForm = () => {
  $("#firstName").val("");
  $("#lastName").val("");
  $("#email").val("");
  $("#age").val("");
  $("#job").val("");
};

const setUpForEdit = (firstName, lastName, email, age, job) => {
  $("#formTitle").text("Edit profile");
  $("#firstName").val(firstName);
  $("#lastName").val(lastName);
  $("#email").val(email);
  $("#age").val(age);
  $("#job").val(job);
  $("#addProfileBtn").text("UPDATE");
  $("#addProfileBtn").addClass("updateBtn");
  $("#addProfileBtn").removeClass("addProfileBtn");
  $("#inputField").css("background-color", "lightblue");
};

const setUpForAdd = () => {
  $("#formTitle").text("Add profile");
  resetForm();
  $("#addProfileBtn").text("ADD");
  $("#addProfileBtn").addClass("addProfileBtn");
  $("#addProfileBtn").removeClass("updateBtn");
  $("#inputField").css("background-color", "white");
}

const renderProfile = (profiles, target) => {
  console.log(profiles);
  const html = profiles
    .map((userProfile) => profileTemplate(userProfile))
    .join("");
  $(target).html(html);

  const el = document.querySelector("#inputField");

  $(".cancelBtn").on("click", () => {
    setUpForAdd();
  });

  $(".editProfileBtn").on("click", ({target}) => {
    const {dataset: {id, first, last, email, age, job}} = target;
    console.log("edit clicked id = " + id);
    el.dataset.id = id;

    setUpForEdit(first, last, email, age, job);
    console.log("edit clicked id = " + id);
  });

  $("#addProfileBtn").on("click", () => {
    const newFirst =  $("#firstName").val();
    const newLast = $("#lastName").val();
    const newEmail = $("#email").val();
    const newAge = $("#age").val();
    const newJob = $("#job").val();
    if(el.dataset.id === "0"){
      console.log("ADD called");
      addProfile(newFirst, newLast, newEmail, newAge, newJob);
    } else {
      updateProfile(parseInt(el.dataset.id, 10), newFirst, newLast, newEmail, newAge, newJob);
      setUpForAdd();
    }
  });
};

const getProfiles = () => {
  $.ajax({
    url: "/get-profile",
    dataType: "json",
    type: "GET",
    success: function ({rows: data}) {
      console.log(data);
      renderProfile(data, "#profileData");

      $(".deleteProfileBtn").on("click", ({ target }) => {
        const {
          dataset: { id },
        } = target;
        console.log(id);
        removeProfile(id);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#profileData").text(jqXHR.statusText);
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    },
  });
};

const addProfile = (firstName, lastName, email, age, job) => {
  let formData = {
    firstName,
    lastName,
    email,
    age,
    job,
  };

  $.ajax({
    url: "/add-profile",
    dataType: "json",
    type: "POST",
    data: formData,
    success: function (data) {
      console.log("success!");
      getProfiles();
      resetForm();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#profileData").text(jqXHR.statusText);
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    },
  });
};

const removeProfile = (id) => {
  $.ajax({
    url: "/delete-by-ID",
    dataType: "json",
    type: "POST",
    data: { id },
    success: function (data) {
      getProfiles();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#profileData").text(jqXHR.statusText);
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
};

const updateProfile = (id, first, last, email, age, job) => {
  $.ajax({
    url:"/update-profile",
    dataType: "json",
    type: "POST",
    data: {id, first, last, email, age, job},
    success: function (data) {
      getProfiles();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#profileData").text(jqXHR.statusText);
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    },
  });
};

$(document).ready(() => {
  getProfiles();
});

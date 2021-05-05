"use strict";

const profileTemplate = ({ ID, firstName, lastName, email, age, job }) =>
  `
  <div id="input${ID}"></div>
  <p>${firstName}</p>
  <p>${lastName}</p>
  <p>${email}</p>
  <p class="${ID}" ><span data-id=${ID} data-age="${age}">${age}</span></p>
  <p>${job}</p>
  <button data-id="${ID}" class="deleteProfileBtn"> DELETE </button>
                `;

const renderProfile = (profiles, target) => {
  console.log(profiles);
  const html = profiles
    .map((userProfile) => profileTemplate(userProfile))
    .join("");
  $(target).html(html);

  $("#profileData").on("click", ({target}) => {
    console.log('profile data');
    const {dataset: {id = 0, age}} = target;
    if(id === 0){
      return;
    }
    const updateInput = 
    `<input id="updateAgeInput" type="text" name="age" value="${age}"><br>
    `;
    $(`#input${id}`).html(updateInput);
    
    $('#updateAgeInput').keypress((e) => {
      if(e.which == 13){
        console.log("key up!!!");
        const newAge = $('#updateAgeInput').val();
        updateProfile(id, newAge);
      }
    });
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

const addProfile = () => {
  $("#addProfileBtn").click(function (e) {
    e.preventDefault();

    let formData = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      email: $("#email").val(),
      age: $("#age").val(),
      job: $("#job").val(),
    };

    $.ajax({
      url: "/add-profile",
      dataType: "json",
      type: "POST",
      data: formData,
      success: function (data) {
        getProfiles();
        $("#firstName").val("");
        $("#lastName").val("");
        $("#email").val("");
        $("#age").val("");
        $("#job").val("");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#profileData").text(jqXHR.statusText);
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      },
    });
  });
};

const removeProfile = (id) => {
  $.ajax({
    url: "/delete-by-ID",
    dataType: "json",
    type: "POST",
    data: { id },
    success: function (data) {
      console.log(id);
      getProfiles();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#profileData").text(jqXHR.statusText);
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
};

const updateProfile = (id, newAge) => {
  $.ajax({
    url:"/update-profile",
    dataType: "json",
    type: "POST",
    data: {id, newAge},
    success: function (data) {
      getProfiles();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $("#profileData").text(jqXHR.statusText);
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    },

  });
};

const editProfile = () => {
  $("#profileData").on("click", "span", function () {
    if ($(this).parent().attr("class") === "age") {
      let spanText = $(this).text();
      let p = $(this).parent();
      let input = $("<input type='text' value'" + spanText + "'>");
      td.html(input);
      keyup();
      // $(input).keyup(function (e) {
      //   let val = null;
      //   let span = null;
      //   if (e.which == 13) {
      //     val = $(input).val();
      //     span = $("<span>" + val + "</span>");
      //     td.html(span);

      //     let dataToSend = {
      //       id: p.parent().find(age).html,
      //       age: val,
      //     };
      //     $.ajax({
      //       url: "/update-profile",
      //       dataType: "json",
      //       type: "POST",
      //       data: dataToSend,
      //       success: function (data) {
      //         //console.log(data);
      //         $("#profileData").html("DB updated.");
      //         getProfiles();
      //       },
      //       error: function (jqXHR, textStatus, errorThrown) {
      //         $("#profileData").text(jqXHR.statusText);
      //         console.log("ERROR:", jqXHR, textStatus, errorThrown);
      //       },
      //     });
      //   }
      // });
    };
  });
};

const keyUp = () => {
  $(input).keyup(function (e) {
    let val = null;
    let span = null;
    if (e.which == 13) {
      val = $(input).val();
      span = $("<span>" + val + "</span>");
      td.html(span);

      let dataToSend = {
        id: p.parent().find(age).html,
        age: val,
      };
      $.ajax({
        url: "/update-profile",
        dataType: "json",
        type: "POST",
        data: dataToSend,
        success: function (data) {
          //console.log(data);
          $("#profileData").html("DB updated.");
          getProfiles();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $("#profileData").text(jqXHR.statusText);
          console.log("ERROR:", jqXHR, textStatus, errorThrown);
        },
      });
    }
  });
}

$(document).ready(() => {
  getProfiles();
  addProfile();
  editProfile();
  keyUp();
});

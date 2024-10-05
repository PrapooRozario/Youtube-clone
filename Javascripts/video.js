const loadVideos = async (searchText = "") => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  );
  const data = await response.json();
  displayVideos(data.videos);
};

function getTime(time) {
  const year = parseInt(time / 31536000);
  const days = parseInt(time / 86400);
  const hour = parseInt(time / 3600);
  let remainingSec = time % 3600;
  const min = parseInt(remainingSec / 60);
  remainingSec = remainingSec % 60;
  if (year > 0) {
    return `${year} year ago`;
  } else if (days > 0) {
    return `${days} day ago`;
  } else if (hour > 0) {
    return `${hour} hour ago`;
  } else if (min > 0) {
    return `${min} min ago`;
  } else if (remainingSec > 0) {
    return `${remainingSec} sec ago`;
  } else {
    return "";
  }
}

function displayVideos(data) {
  const vdo = document.getElementById("videos-container");
  vdo.innerHTML = "";

  data.forEach((video) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div >
          <img src="${video.thumbnail}" alt="Thumbnail" class="w-full" />

          <div class="mt-3">
            <div class="flex gap-3">
              <div>
                <img src="${
                  video.authors[0].profile_picture
                }" alt=""  class="w-10 h-10 rounded-full object-cover" />
              </div>

              <div>
                <h2 class="text-white font-semibold">
                  ${video.title}
                </h2>
                <p class="gap-2 flex text-[#AAAAAA] mt-4">
                   ${video.authors[0].profile_name} ${
      video.authors[0].verified === true
        ? '<img src="assets/verify.svg" alt="" class="w-4" />'
        : ""
    }
                </p>

                <p class="gap-2 flex text-[#AAAAAA]">
                        ${video.others.views}
 <img src="assets/Ellipse 5.svg" alt="" /><span
                    >${getTime(video.others.posted_date)}</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>`;
    document.getElementById("videos-container").appendChild(div);
  });
}

document.getElementById("search-input").addEventListener("keyup", (text) => {
  const searchText = text.target.value;
  loadVideos(searchText);
});

loadVideos();

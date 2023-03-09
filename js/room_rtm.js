let handleMemberJoined = async (MemberId) => {
  console.log("New Member has joined the room", MemberId);
  addMemberToDom(MemberId);
};

let addMemberToDom = async (MemberId) => {
  let { name } = await rtmClient.getUserAttributeByKeys(MemberId, ["name"]);

  let membersWrapper = document.getElementById("member__list");
  let memberItem = `<div class="member__wrapper" id="member__${MemberId}__wrapper">
                    <span class="green__icon"></span>
                    <p class="member_name">${name}</p>
                    </div>`;
  membersWrapper.insertAdjacentHTML("beforeend", memberItem);
};

let handleMemberLeft = async (MemberId) => {
  removeMemberFromDom(MemberId);
};

let getMembers = async () => {
  let members = await channel.getMembers();

  for (let i = 0; members.length > i; i++) {
    addMemberToDom(members[i]);
  }
};

let removeMemberFromDom = async (MemberId) => {
  let memberWrapper = document.getElementById(`member__${MemberId}__wrapper`);
  memberWrapper.remove();
};

let leaveChannel = async () => {
  await channel.leave();
  await rtmClient.logout();
};

window.addEventListener("beforeunload", leaveChannel);

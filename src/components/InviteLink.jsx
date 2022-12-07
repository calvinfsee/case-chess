const domain = 'http://localhost:5173/game/';

export default function InviteLink ({ gameid }) {
  return (
    <div id='invite-link-container'>
      <h3>Copy and paste the URL below to send to your friend!</h3>
      <h3 id='invite-link'>{domain + gameid}</h3>
    </div>
  );
}
const $ = id => document.getElementById(id);
let report;
fetch('report.json').then(response => { if (!response.ok) throw new Error('Report unavailable'); return response.json(); }).then(data => {
  if (!Array.isArray(data.events) || !data.events.length) throw new Error('No validated events');
  report = data;
  for (const event of data.events) { const option = new Option(event.label, event.id); $('scenario').add(option); }
  for (const event of data.events) {
    const row = document.createElement('tr'); row.dataset.event = event.id;
    for (const value of [event.id,event.transaction.direction,event.status,event.reason]) { const cell=document.createElement('td'); cell.textContent=value; row.append(cell); }
    $('report-rows').append(row);
  }
  $('provenance').textContent = 'Validator output SHA-256: ' + data.sourceSha256;
  choose(); $('scenario').disabled=false; $('validate').disabled=false;
}).catch(error => { $('decision').textContent = error.message + '. Rebuild the fixture pipeline to continue.'; $('validate').disabled=true; });
function current() { return report.events.find(event => event.id === $('scenario').value); }
function choose() {
  const event=current(); $('event-title').textContent=event.label;
  $('event-context').textContent=event.transaction.containerId+' · '+event.transaction.direction+' · '+event.transaction.truckPlate;
  $('payload').textContent=JSON.stringify(event.transaction,null,2);
  $('decision').className=''; $('decision').textContent='Ready to inspect the validator result for '+event.id+'.'; $('impact').hidden=true;
  $('impact-text').textContent='Reveal this validation result to trace it into the batch.';
  document.querySelectorAll('[data-event]').forEach(row=>row.classList.remove('selected'));
}
$('scenario').addEventListener('change',choose);
$('validate').addEventListener('click',()=>{const event=current(); $('decision').textContent=event.status+' — '+event.reason; $('decision').className=event.status.toLowerCase(); $('impact').hidden=false;});
$('impact').addEventListener('click',()=>{
  for (const key of ['total','approved','blocked']) $(key).textContent=report[key];
  const event=current(); $('impact-text').textContent='Event '+event.id+' contributes one '+event.status.toLowerCase()+' decision to this '+report.total+'-event batch. A blocked event does not represent a gate release.';
  document.querySelector('[data-event="'+event.id+'"]').classList.add('selected');
  $('dashboard').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});

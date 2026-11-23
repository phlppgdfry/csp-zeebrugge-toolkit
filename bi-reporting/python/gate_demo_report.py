"""Aggregate only the outputs of the Groovy gate validator, without reimplementing rules."""
from pathlib import Path
import json, csv, hashlib
ROOT = Path(__file__).resolve().parents[2]
folder = ROOT / 'operations-demo'
raw = (folder/'validated-events.json').read_bytes()
events = json.loads(raw)
assert len(events) == len({e['id'] for e in events}), 'Duplicate event IDs'
assert all(e['status'] in ('APPROVED', 'BLOCKED') for e in events)
report = dict(source='GateTransactionInterceptor synthetic fixture replay', sourceSha256=hashlib.sha256(raw).hexdigest(), total=len(events), approved=sum(e['status']=='APPROVED' for e in events), blocked=sum(e['status']=='BLOCKED' for e in events), events=events)
assert report['approved']+report['blocked']==report['total']
(folder/'report.json').write_text(json.dumps(report,indent=2)+'\n')
with (folder/'gate-report.csv').open('w',newline='') as output:
    writer=csv.writer(output,lineterminator="\n");writer.writerow(['event_id','container','direction','decision','reason'])
    for event in events: writer.writerow([event['id'],event['transaction']['containerId'],event['transaction']['direction'],event['status'],event['reason']])
print(f"Gate report: {report['total']} events, {report['approved']} approved, {report['blocked']} blocked")

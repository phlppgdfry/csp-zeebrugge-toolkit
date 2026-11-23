import groovy.json.JsonSlurper
import groovy.json.JsonOutput

/** Runs the real gate validator with synthetic, isolated lookup fixtures. */
class GateDemoExporter {
    static void main(String[] args) {
        def scenarios = new JsonSlurper().parse(new File(args[0]))
        def events = scenarios.collect { scenario ->
            def validator = new DemoGateValidator(fixture: scenario.fixture)
            String status, reason
            try {
                status = validator.validateGateTransaction(scenario.transaction).status
                reason = 'VBS plate, holds and direction-specific PIN checks passed.'
            } catch (Exception e) {
                status = 'BLOCKED'; reason = e.message
            }
            assert status == scenario.expected : "Unexpected decision for ${scenario.id}"
            [id: scenario.id, label: scenario.label, transaction: scenario.transaction,
             status: status, reason: reason, validator: 'GateTransactionInterceptor',
             source: 'Synthetic fixture; no live N4, VBS or gate connection']
        }
        new File(args[1]).text = JsonOutput.prettyPrint(JsonOutput.toJson(events)) + '\n'
    }
}
class DemoGateValidator extends GateTransactionInterceptor {
    Map fixture
    protected String lookupVbsPlate(String bookingId) { fixture.registeredPlate }
    protected List lookupActiveHolds(String containerId) { fixture.holds }
    protected String lookupContainerPin(String containerId) { fixture.expectedPin }
}

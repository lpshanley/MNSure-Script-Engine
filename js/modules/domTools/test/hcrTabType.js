/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/hcrTabType',function( _tab ){
	
	if( _engine.domTools.get.hcrTabList().length > 0 ){

		typeof _tab == 'undefined' ? 
			_tab = _engine.domTools.get.hcrTabActive() : 
			typeof _tab[0] != 'undefined' ?
				_tab = _tab[0] :
				_tab = _tab;
		
		let returnType;
		
		switch( dijit.registry.byNode( _tab ).page.params.tabDescriptor.tabID ){
			case 'HCRIntegratedCase':
				returnType = "Integrated Case";
				break;
			case 'PersonHome':
				returnType = "Person Page";
				break;
			case 'PersonSearch':
				returnType = "Person Search";
				break;
			case 'CaseSearch':
				returnType = "Case Search";
				break;
			case 'EvidenceType':
				returnType = "Evidence|" + dijit.registry.byNode( _tab ).page.title.split('-')[0].trim();
				break;
			case 'CommonIntakeMyApplications':
				returnType = "My Application Cases";
				break;
			case 'EmployerSearch':
				returnType = "Employer Search";
				break;
			case 'ParticipantSearch':
				returnType = "All Participants Search";
				break;
			case 'CommonIntakeApplicationSearch':
				returnType = "Application Case Search";
				break;
			case 'InvestigationSearch':
				returnType = "Investigation Search";
				break;
			case 'IncidentSearch':
				returnType = "Incident Search";
				break;
			case 'EducationalInstituteSearch':
				returnType = "Educational Institute Search";
				break;
			case 'ExternalPartySearch':
				returnType = "External Party Search";
				break;
			case 'ExternalPartyOfficeSearch':
				returnType = "External Party Office Search";
				break;
			case 'UtilitySearch':
				returnType = "Utility Search";
				break;
			case 'MyCaseQueries':
				returnType = "My Case Queries";
				break;
			case 'MyItemsOfInterest':
				returnType = "My Items of Interest";
				break;
			case 'MyCases':
				returnType = "My Cases";
				break;
			case 'MyRecentlyApprovedCases':
				returnType = "My Recently Approved Cases";
				break;
			case 'MyRecentlyAssignedCases':
				returnType = "Cases Recently Assigned to Me";
				break;
			case 'MyRecentlyViewedCases':
				returnType = "Recently Viewed Cases";
				break;
			case 'MyServicePlans':
				returnType = "My Service Plans";
				break;
			case 'StreamlinedMedicaidHome':
				returnType = "PDC|medical assistance";
				break;
			case 'HCRStateBasicHealthPlanPDHome':
				returnType = "PDC|minnesotacare";
				break;
			case 'HCRInsuranceAssistanceHome':
				returnType = "PDC|insurance assistance";
				break;
			case 'HCRUnassistedQualifiedHealthPlanPDHome':
				returnType = "PDC|unassisted qualified health plan";
				break;
			default:
				_engine.debug.warn( "[hcrTabType] Undefined tab type: " + dijit.registry.byNode( _tab ).page.params.tabDescriptor.tabID );
				returnType = null;
				break;
			
		}
		
		return returnType;
	
	} else {

		_engine.debug.warn("- * There are no open tabs that are available to test.");

		return "UNDEFINED";

	}
	
});
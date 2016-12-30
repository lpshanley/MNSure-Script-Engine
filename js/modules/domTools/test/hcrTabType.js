/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('domTools/test/hcrTabType',function( _tab ){
	
	let returnVal;
	
	typeof _tab === 'undefined' ? 
		_tab = _engine.domTools.get.hcrTabActive() : 
		typeof _tab[0] !== 'undefined' ?
			_tab = _tab[0] :
			_tab = _tab;
	
	if( _tab ){
			
		let nodeData = dijit.registry.byNode( _tab ),
				typeMatch = {
					'HCRIntegratedCase' : "Integrated Case",
					'PersonHome' : "Person Page",
					'PersonSearch' : "Person Search",
					'CaseSearch' : "Case Search",
					'EvidenceType' : "Evidence|" + nodeData.page.title.split('-')[0].trim(),
					'CommonIntakeMyApplications' : "My Application Cases",
					'EmployerSearch' : "Employer Search",
					'ParticipantSearch' : "All Participants Search",
					'CommonIntakeApplicationSearch' : "Application Case Search",
					'InvestigationSearch' : "Investigation Search",
					'IncidentSearch' : "Incident Search",
					'EducationalInstituteSearch' : "Educational Institute Search",
					'ExternalPartySearch' : "External Party Search",
					'ExternalPartyOfficeSearch' : "External Party Office Search",
					'UtilitySearch' : "Utility Search",
					'MyCaseQueries' : "My Case Queries",
					'MyItemsOfInterest' : "My Items of Interest",
					'MyCases' : "My Cases",
					'MyRecentlyApprovedCases' : "My Recently Approved Cases",
					'MyRecentlyAssignedCases' : "Cases Recently Assigned to Me",
					'MyRecentlyViewedCases' : "Recently Viewed Cases",
					'MyServicePlans' : "My Service Plans",
					'StreamlinedMedicaidHome' : "PDC|medical assistance",
					'HCRStateBasicHealthPlanPDHome' : "PDC|minnesotacare",
					'HCRInsuranceAssistanceHome' : "PDC|insurance assistance",
					'HCRUnassistedQualifiedHealthPlanPDHome' : "PDC|unassisted qualified health plan"
				};
		
		returnVal = typeMatch[ nodeData.page.params.tabDescriptor.tabID ];
		
		if( typeof returnVal === 'undefined' ) returnVal = false;
		
		if( !returnVal ) _engine.debug.warn( `[hcrTabType] Undefined tab type: ${ nodeData.page.params.tabDescriptor.tabID }` );
		
	}
	else returnVal = false;
	
	if( !returnVal ) _engine.debug.warn( `[hcrTabType] Tab information could not be determined or defined.` );
	
	return returnVal;
	
});
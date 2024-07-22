from pydantic import BaseModel
from sqlalchemy import Column, String, Integer, Identity, ForeignKey, Date
import datetime
from models.users import Base, User,Passport
from models.cases import Case, Invidivual



class Track(Base):
    __tablename__ = 'track'
    id_track = Column(Integer, Identity(start= 1),primary_key=True)
    fk_active_case_id = Column(Integer,ForeignKey(Case.active_cases_id),nullable=False )
    type_track = Column(String,nullable=False)
    info_track = Column(String,nullable=False)

class Inspect(Base):
    __tablename__ = 'inspect'
    id_inspect = Column(Integer, Identity(start= 1),primary_key=True)
    fk_active_case_id = Column(Integer,ForeignKey(Case.active_cases_id),nullable=False)
    date_inspect = Column(Date, nullable=False)
    begin_inspect = Column(String,nullable=False)
    end_inspect = Column(String,nullable=False)
    message_inspect = Column(String,nullable=False)
    from_message_inspect = Column(String,nullable=False)
    place_of_inspect = Column(String,nullable=False)
    inspect_exam = Column(String,nullable=False)
    technical_means = Column(String,nullable=False)
    conditions = Column(String,nullable=False)
    establish = Column(String,nullable=False)
    photography = Column(String,nullable=False)
    sized_items = Column(String,nullable=False)
    items_for_inspect = Column(String,nullable=False)
    familiarization = Column(String,nullable=False)

class ProceduralPosition(Base):
    __tablename__ = 'procedural_position'
    id_procedural_position = Column(Integer, Identity(start= 1),primary_key=True)
    name_position = Column(String, nullable=False)

class InspectPersonsInvolved(Base):
    __tablename__ = 'inspect_persons_involved'
    id_persons_involved = Column(Integer, ForeignKey(Invidivual.individuals_id),primary_key=True)
    id_inspect = Column(Integer, ForeignKey(Inspect.id_inspect),primary_key=True)
    notes = Column(String, nullable=True)
    petition = Column(Integer,nullable=False)
    fk_procedural_position = Column(Integer,ForeignKey(ProceduralPosition.id_procedural_position),nullable=False)

class Check(Base):
    __tablename__ = 'check_comp'
    id_check = Column(Integer, Identity(start= 1),primary_key=True)
    fk_active_case_id = Column(Integer,ForeignKey(Case.active_cases_id),nullable=False )
    items = Column(String,nullable=False)
    date_check = Column(Date, nullable=False)
    begin_check = Column(String,nullable=False)
    end_check = Column(String,nullable=False)
    check_what = Column(String,nullable=False)
    check_place = Column(String,nullable=False)
    when_size = Column(String,nullable=False)
    where_size = Column(String,nullable=False)
    which_action_size = Column(String,nullable=False)
    technical_means = Column(String,nullable=False)
    conditions = Column(String,nullable=False)
    establish = Column(String,nullable=False)
    wrap = Column(String,nullable=False)
    photography = Column(String,nullable=False)
    items_for_check = Column(String,nullable=False)
    familiarizathion = Column(String,nullable=False)
class CheckPersonsInvolved(Base):
    __tablename__ = 'check_person_involved'
    id_persons_involved = Column(Integer, ForeignKey(Invidivual.individuals_id),primary_key=True)
    id_check = Column(Integer, ForeignKey(Check.id_check),primary_key=True)
    notes = Column(String, nullable=True)
    petition = Column(Integer,nullable=False)
    fk_procedural_position = Column(Integer,ForeignKey(ProceduralPosition.id_procedural_position),nullable=False)
class Expertise(Base):
    __tablename__ = 'expertise'
    id_expertise = Column(Integer, Identity(start= 1),primary_key=True)
    fk_active_case_id = Column(Integer,ForeignKey(Case.active_cases_id),nullable=False )
    app_comp = Column(String,nullable=True)
    prog_comp = Column(String,nullable=True)
    inf_comp = Column(String,nullable=True)
    comp_net = Column(String,nullable=True)
class QuestPerson(Base):
    __tablename__ = 'quest_persons'
    id_quest_persons = Column(Integer, Identity(start= 1),primary_key=True)
    fk_active_case_id = Column(Integer,ForeignKey(Case.active_cases_id),nullable=False)
    fk_procedural_position = Column(Integer,ForeignKey(ProceduralPosition.id_procedural_position),nullable=False)
    individuals_id = Column(Integer,ForeignKey(Invidivual.individuals_id),nullable=False)
    notes = Column(String,nullable=True)
    petition = Column(Integer,nullable=False)
class Clarif(Base):
    __tablename__ = 'clarif'
    id_clarif = Column(Integer, Identity(start= 1),primary_key=True)
    date_clarif = Column(Date, nullable=False)
    begin_clarif = Column(String,nullable=False)
    end_clarif = Column(String,nullable=False)
    place_clarif = Column(String,nullable=False)
    text_clarif = Column(String,nullable=False)
    technical_means = Column(String,nullable=False)
    read_clarif = Column(String,nullable=False)
    true_clarif = Column(Integer,nullable=False)
    addition_clarif = Column(String,nullable=False)
    photography = Column(String,nullable=False)
    fk_id_quest_person = Column(Integer,ForeignKey(QuestPerson.id_quest_persons),nullable=False)
class ClarifPersonInvolved(Base):
    __tablename__ = 'clarif_persons_involved'
    id_persons_involved = Column(Integer, ForeignKey(Invidivual.individuals_id),primary_key=True)
    id_clarif = Column(Integer, ForeignKey(Clarif.id_clarif),primary_key=True)
    notes = Column(String, nullable=True)
    petition = Column(Integer,nullable=False)
    fk_procedural_position = Column(Integer,ForeignKey(ProceduralPosition.id_procedural_position),nullable=False)
class Quest(Base):
    __tablename__ = 'quest'
    id_quest = Column(Integer, Identity(start= 1),primary_key=True)
    fk_id_quest_person = Column(Integer,ForeignKey(QuestPerson.id_quest_persons),nullable=False)
    date_quest = Column(String,nullable=False)
    begin_quest = Column(String,nullable=False)
    end_quest = Column(String,nullable=False)
    quest_place = Column(String,nullable=False)
    technical_means = Column(String,nullable=False)
    establish = Column(String,nullable=False)
    photography = Column(String,nullable=False)
    playing = Column(String,nullable=False)
    familiarization = Column(String,nullable=False)
class QuestPersonInvolved(Base):
    __tablename__ = 'quest_persons_involved'
    id_persons_involved = Column(Integer, ForeignKey(Invidivual.individuals_id),primary_key=True)
    id_quest = Column(Integer, ForeignKey(Quest.id_quest),primary_key=True)
    notes = Column(String, nullable=True)
    petition = Column(Integer,nullable=False)
    fk_procedural_position = Column(Integer,ForeignKey(ProceduralPosition.id_procedural_position),nullable=False)
class Set(Base):
    __tablename__ = 'set_criminal'
    id_criminal = Column(Integer, Identity(start= 1),primary_key=True)
    fk_active_case_id = Column(Integer,ForeignKey(Case.active_cases_id),nullable=False )
    criminal = Column(String,nullable=False)

class Witnes(Base):
    __tablename__ = 'witnes'
    id_witnes = Column(Integer, Identity(start= 1),primary_key=True)
    fk_active_case_id = Column(Integer,ForeignKey(Case.active_cases_id),nullable=False )
    witnes = Column(String,nullable=False)

class DeclarationVictim(Base):
    __tablename__ = 'declaration_victim'
    id_declaration_victim = Column(Integer, Identity(start= 1),primary_key=True)
    fk_active_case_id = Column(Integer,ForeignKey(Case.active_cases_id),nullable=False )
    rationale = Column(String,nullable=False)
    type_of_harm = Column(String,nullable=False)
    date_declaration = Column(Date,nullable=False)
    fk_individuals_id = Column(Integer,ForeignKey(Invidivual.individuals_id),nullable=False)

class DeclarationCriminalCase(Base):
    __tablename__ = 'declaration_criminal_case'
    id_declaration_criminal_case = Column(Integer, Identity(start= 1),primary_key=True)
    fk_active_case_id = Column(Integer,ForeignKey(Case.active_cases_id),nullable=False )
    time_declaration = Column(String,nullable=False)
    date_declaration = Column(Date,nullable=False)
    reason_declaration = Column(String,nullable=False)
    item_part_article = Column(String,nullable=False)
    know_person = Column(Integer,nullable=False)
    firstname = Column(String,nullable=True)
    middlename = Column(String,nullable=True)
    lastname = Column(String,nullable=True)
    name_procurator = Column(String,nullable=False)
    date_procurator = Column(Date,nullable=False)
    time_procurator = Column(String,nullable=False)
    date_victim = Column(Date,nullable=False)
    date_criminal_person = Column(Date,nullable=True)
    number_cases = Column(String,nullable=False)

class OrderWanted(Base):
    __tablename__ = 'order_wanted'
    id_order_wanted = Column(Integer, Identity(start= 1),primary_key=True)
    fk_active_case_id = Column(Integer,ForeignKey(Case.active_cases_id),nullable=False)
    check_criminal = Column(String,nullable=False)
    text_order_wanted = Column(String,nullable=False)
    name_orders = Column(String, nullable=False)

class createOrderWanted(BaseModel):
    user_id:int
    case_id:int
    check_criminal:str
    text_order_wanted:str
    name_orders: str

class createDeclarationVictim(BaseModel):
    user_id:int
    case_id:int
    rationale:str
    type_of_harm:str
    date_declaration:datetime.date
    fk_individuals_id:int

class createDeclarationCriminalCase(BaseModel):
    user_id:int
    case_id:int
    time_declaration:str
    date_declaration:datetime.date
    reason_declaration:str
    item_part_article:str
    know_person:int
    firstname:str
    middlename:str
    lastname:str
    name_procurator:str
    date_procurator:datetime.date
    time_procurator:str
    date_victim:datetime.date
    date_criminal_person:datetime.date
    number_cases:str
class createQuestPerson(BaseModel):
    fk_active_case_id: int
    fk_procedural_position: int
    firstname: str
    middlename: str
    lastname: str
    datebrithday: str
    bitrh_residence: str
    place_of_recidense: str
    resident: str
    education: str
    family_status: str
    place_work: str
    military: str
    criminal: str
    passport_serial: str
    passport_number: str
    other: str
    notes: str
    petition: int
class createVictimQuestPerson(BaseModel):
    fk_active_case_id:int
    fk_procedural_position:int
    notes: str
    petition: int
class createProceduralPosition(BaseModel):
    name: str
class createClarif(BaseModel):
    user_id:int
    case_id:int
    date_clarif:datetime.date
    begin_clarif:str
    end_clarif:str
    place_clarif:str
    text_clarif:str
    technical_means:str
    read_clarif:str
    true_clarif:int
    addition_clarif:str
    photography:str
    quest_person:int
class createTrack(BaseModel):
    user_id:int
    case_id:int
    type_track: str
    info_track: str
class createInspect(BaseModel):
    user_id:int
    case_id:int
    date_inspect:datetime.date
    begin_inspect:str
    end_inspect:str
    message_inspect:str
    from_message_inspect:str
    inspect_exam:str
    place_of_inspect:str
    technical_means:str
    conditions:str
    establish:str
    photography:str
    sized_items:str
    items_for_inspect:str
    familiarization:str
class createCheck(BaseModel):
    user_id:int
    case_id:int
    items:str
    date_check:datetime.date
    begin_check:str
    end_check:str
    check_what:str
    check_place:str
    when_size:str
    where_size:str
    which_action_size:str
    technical_means:str
    conditions:str
    establish:str
    wrap:str
    photography:str
    items_for_check:str
    familiarizathion:str
class createExpertise(BaseModel):
    user_id:int
    case_id:int
    app_comp:str
    prog_comp:str
    inf_comp:str
    comp_net:str
class createQuest(BaseModel):
    user_id:int
    case_id:int
    quest_person:int
    date_quest:datetime.date
    begin_quest:str
    end_quest:str
    quest_place:str
    technical_means:str
    establish:str
    photography:str
    playing:str
    familiarization:str
class createSet(BaseModel):
    user_id:int
    case_id:int
    criminal:str
class createWitnes(BaseModel):
    user_id:int
    case_id:int
    witnes:str
class createPersonInvolved(BaseModel):
    first_name:str
    middle_name:str
    last_name:str
    residence:str
    passport_serial:str
    passport_number:str
class createInspectPersonInvolved(BaseModel):
    idPerson:int
    idInspect:int
    notes:str
    petition:int 
    fk_procedural_position:int
class createQuestPersonInvolved(BaseModel):
    idPerson:int
    idQuestPerson:int
    notes:str
    petition:int 


class updatePersonInvolved(BaseModel):
    first_name:str
    middle_name:str
    last_name:str
    residence:str
    passport_serial:str
    passport_number:str
class updatePersonInvolvedQuest(BaseModel):
    petition: int
    notes: str
    fk_procedural_position:int
class updateOrderWanted(BaseModel):
    check_criminal:str
    text_order_wanted:str
    name_orders:str
class updateDeclarationVictim(BaseModel):
    rationale:str
    type_of_harm:str
    date_declaration:datetime.date
    fk_individuals_id:int
class updateDeclarationCriminalCase(BaseModel):
    time_declaration:str
    date_declaration:datetime.date
    reason_declaration:str
    item_part_article:str
    know_person:int
    firstname:str
    middlename:str
    lastname:str
    name_procurator:str
    date_procurator:datetime.date
    time_procurator:str
    date_victim:datetime.date
    date_criminal_person:datetime.date
    number_cases:str
class updateClarif(BaseModel):
    date_clarif:datetime.date
    begin_clarif:str
    end_clarif:str
    place_clarif:str
    text_clarif:str
    technical_means:str
    read_clarif:str
    true_clarif:int
    addition_clarif:str
    photography:str
class editQuestPerson(BaseModel):
    firstname: str
    middlename: str
    lastname: str
    datebrithday: str
    bitrh_residence: str
    place_of_recidense: str
    resident: str
    education: str
    family_status: str
    place_work: str
    military: str
    criminal: str
    passport_serial: str
    passport_number: str
    other: str
    notes: str
    petition: int
class updateInspect(BaseModel):
    date_inspect:datetime.date
    begin_inspect:str
    end_inspect:str
    message_inspect:str
    from_message_inspect:str
    inspect_exam:str
    place_of_inspect:str
    technical_means:str
    conditions:str
    establish:str
    photography:str
    sized_items:str
    items_for_inspect:str
    familiarization:str
class updateTrack(BaseModel):
    type_track: str
    info_track: str
class updateCheck(BaseModel):
    items:str
    date_check:datetime.date
    begin_check:str
    end_check:str
    check_what:str
    check_place:str
    when_size:str
    where_size:str
    which_action_size:str
    technical_means:str
    conditions:str
    establish:str
    wrap:str
    photography:str
    items_for_check:str
    familiarizathion:str
class updateExpertise(BaseModel):
    app_comp:str
    prog_comp:str
    inf_comp:str
    comp_net:str
class updateQuest(BaseModel):
    date_quest:datetime.date
    begin_quest:str
    end_quest:str
    quest_place:str
    technical_means:str
    establish:str
    photography:str
    playing:str
    familiarization:str
class updateSet(BaseModel):
    criminal:str
class updateWitnes(BaseModel):
    witnes:str
class requestMobile(BaseModel):
    name_org:str
    date_incidient: datetime.date
    time: str
    duration: str
    phone: str
    money:str
class requestBank(BaseModel):
    bank: str
    money: str
class requestDomain(BaseModel):
    org_name: str
    first_name:str
    middle_name: str
    last_name: str
    adress:str
    domain_name: str
    money:str
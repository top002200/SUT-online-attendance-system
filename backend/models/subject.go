package models


type Subject struct {
    SubjectID     string `gorm:"primaryKey" json:"subject_id"`
    SubjectName   string `json:"subject_name"`
    Teachers      []Teacher `gorm:"many2many:teacher_subjects;" json:"teachers"`
}

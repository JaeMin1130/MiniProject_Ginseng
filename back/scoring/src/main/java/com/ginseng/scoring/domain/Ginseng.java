package com.ginseng.scoring.domain;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Ginseng {
    @Id
    @GeneratedValue
    private long id;
    @Lob
    private byte[] originalPhoto;
    @Lob
    private byte[] LabeledPhoto;
    private String info;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date date;
}
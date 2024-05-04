package com.Ascendia.server.mapper.SiteEngineer;

import com.Ascendia.server.dto.SiteEngineer.SampleDto;
import com.Ascendia.server.entity.SiteEngineer.Sample;

public class SampleMapper {

    public static SampleDto mapToSampleDto(Sample sample){
        return new SampleDto(
                sample.getId(),
                sample.getFirstName(),
                sample.getLastName(),
                sample.getEmail()
        );
    }

    public static Sample mapToSample(SampleDto sampleDto){
        return new Sample(
                sampleDto.getId(),
                sampleDto.getFirstName(),
                sampleDto.getLastName(),
                sampleDto.getEmail()
        );
    }
}

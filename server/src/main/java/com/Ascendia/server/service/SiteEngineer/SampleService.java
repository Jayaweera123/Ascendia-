package com.Ascendia.server.service.SiteEngineer;

import com.Ascendia.server.dto.SiteEngineer.SampleDto;

import java.util.List;

public interface SampleService {
    SampleDto createSample (SampleDto sampleDto);
    SampleDto getSampleById(int id);

    List<SampleDto> getAllSample();

    SampleDto updateSample (int id, SampleDto sampleDto);

    void deleteSample (int id);
}
